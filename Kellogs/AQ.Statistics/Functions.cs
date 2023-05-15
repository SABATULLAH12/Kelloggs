using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.IO;
using System.Threading;
using System.Diagnostics;

namespace AQ
{
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member 'Statistics'
    public class Statistics
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member 'Statistics'
    {
        /// <summary>
        /// Computes correspondence analysis for the given crosstab. Returns Name, X and Y dimensions.
        /// </summary>
        /// <param name="CrossTab"></param>
        /// <returns>A DataTable.</returns>
        public static DataTable CorrespondenceAnalysis(DataTable CrossTab)
        {
            if (CrossTab == null || CrossTab.Rows.Count == 0 || CrossTab.Columns.Count == 0)
                return null;

            #region Data table preparation

            // copying data to another table; first column is string and rest is double
            DataTable _data = CrossTab.Clone();
            if (_data.Columns[0].DataType.Name != "String")
                _data.Columns[0].DataType = typeof(string);
            for (int ic = 1; ic < _data.Columns.Count; ic++)
            {
                if (_data.Columns[ic].DataType.Name != "Double")
                    _data.Columns[ic].DataType = typeof(double);
            }
            foreach (DataRow tr in CrossTab.Rows)
            {
                _data.ImportRow(tr);
            }

            // result table
            DataTable _result = new DataTable();
            _result.Columns.Add(new DataColumn("Name", typeof(string)));
            _result.Columns.Add(new DataColumn("Dim1", typeof(double)));
            _result.Columns.Add(new DataColumn("Dim2", typeof(double)));
            _result.Columns.Add(new DataColumn("Chi-Dist", typeof(double)));
            #endregion

            #region part 1

            DataRow row;

            // finding table total
            double total = 0;
            for (int ir = 0; ir < _data.Rows.Count; ir++)
            {
                for (int ix = 1; ix < _data.Columns.Count; ix++)
                {
                    total += double.Parse(_data.Rows[ir][ix].ToString());
                }
            }

            // calculate and convert to weights
            for (int ix = 1; ix < _data.Columns.Count; ix++)
            {
                for (int ir = 0; ir < _data.Rows.Count; ir++)
                {
                    _data.Rows[ir][ix] = double.Parse(_data.Rows[ir][ix].ToString()) / total;
                }
            }

            // Add Row Mass Column
            _data.Columns.Add(new DataColumn("Mass", typeof(double)));
            for (int ir = 0; ir < _data.Rows.Count; ir++)
            {
                double ctotal = 0;
                for (int ix = 1; ix < _data.Columns.Count - 1; ix++)
                {
                    ctotal += double.Parse(_data.Rows[ir][ix].ToString());
                }
                _data.Rows[ir][_data.Columns.Count - 1] = ctotal;
            }

            // Add Column Mass Row
            row = _data.NewRow();
            row[0] = "Mass";
            for (int ix = 1; ix < _data.Columns.Count - 1; ix++)
            {
                double ctotal = 0;
                for (int ir = 0; ir < _data.Rows.Count; ir++)
                {
                    ctotal += double.Parse(_data.Rows[ir][ix].ToString());
                }
                row[ix] = ctotal;
            }
            _data.Rows.Add(row);

            // table total
            row[_data.Columns.Count - 1] = 1;//total;//

            #endregion

            #region part 2

            // Total inertia
            //double inertia = 0;
            _data.Columns.Add("Chi-Dist", typeof(double));
            _data.Columns.Add("Inertia", typeof(double));
            // Calculate for the rows
            double rowmass, colmass, observed, expected;
            for (int ir = 0; ir < _data.Rows.Count - 1; ir++)
            {
                double chdrow = 0;
                for (int ic = 1; ic < _data.Columns.Count - 3; ic++)
                {
                    // (observed (row profile) - expected)^2 / expected
                    rowmass = (double)_data.Rows[ir][_data.Columns.Count - 3];
                    colmass = (double)_data.Rows[_data.Rows.Count - 1][ic];
                    observed = (double)_data.Rows[ir][ic];
                    expected = rowmass * colmass / total;

                    chdrow += Math.Pow(observed - expected, 2) / expected;
                }
                // Chi-distance
                _data.Rows[ir][_data.Columns.Count - 2] = Math.Sqrt(chdrow);
                //// Inertia
                //inertia += chdrow * (double)_data.Rows[ir][_data.Columns.Count - 3];
                //_data.Rows[ir][_data.Columns.Count - 1] = chdrow * (double)_data.Rows[ir][_data.Columns.Count - 3];
            }
            DataRow rowc = _data.NewRow();
            rowc[0] = "Chi-Dist";
            DataRow rowi = _data.NewRow();
            rowi[0] = "Inertia";
            // Calculate for the columns
            for (int ic = 1; ic < _data.Columns.Count - 3; ic++)
            {
                double chdcol = 0;
                for (int ir = 0; ir < _data.Rows.Count - 1; ir++)
                {
                    // (observed (column profile) - expected)^2 / expected
                    rowmass = (double)_data.Rows[ir][_data.Columns.Count - 3];
                    colmass = (double)_data.Rows[_data.Rows.Count - 1][ic];
                    observed = (double)_data.Rows[ir][ic];
                    expected = rowmass * colmass / total;
                    chdcol += Math.Pow(observed - expected, 2) / expected;
                }
                // Chi-distance
                rowc[ic] = Math.Sqrt(chdcol);
                //// Inertia
                //rowi[ic] = chdcol * (double)_data.Rows[_data.Rows.Count - 1][ic];
            }
            // Total inertia
            //rowi[_data.Columns.Count - 1] = inertia;
            _data.Rows.Add(rowc);
            _data.Rows.Add(rowi);

            #endregion

            #region part 3

            // preparing input matrix S for svd
            // Matrix S = (P - rc(t)) / sqrt(rc), where P is the contingency table, r is the mass of rows and c the mass of columns in diagonal form
            double[,] S = new double[_data.Rows.Count - 3, _data.Columns.Count - 4];

            double P, r, c;
            for (int ir = 0; ir < _data.Rows.Count - 3; ir++)
            {
                for (int ic = 1; ic < _data.Columns.Count - 3; ic++)
                {
                    P = (double)_data.Rows[ir][ic];
                    r = (double)_data.Rows[ir][_data.Columns.Count - 3];
                    c = (double)_data.Rows[_data.Rows.Count - 3][ic];
                    S[ir, ic - 1] = (P - (r * c)) / Math.Sqrt(r * c);
                }
            }

            // Singula value decomposition
            SvdMatrix msvd = null;

            // Math.Net :: Partially matching with R algorithm
            msvd = (new SVD_MathNet()).SVD(S);

            // Accord.Net :: signs & values not matching
            //msvd = (new SVD_AccordMath()).SVD(S);

            // TAlex :: signs not matching
            //msvd = (new SVD_TAlex()).SVD(S);

            // StarMath :: signs & values not matching. takes only square matrix as input
            //msvd = (new SVD_StarMath()).SVD(S);

            // Alglib :: signs not matching
            //msvd = (new SVD_Alglib()).SVD(S);

            // NLapack :: not working, assembly load error
            //msvd = (new SVD_NLapack()).SVD(S);

            // dnAnalytics :: gives exact output as Math.Net
            //msvd = (new SVD_dnAnalytics()).SVD(S);

            // Meta Numerics :: signs & values not matching
            //msvd = (new SVD_MetaNumerics()).SVD(S);

            // DotNumerics :: signs not matching in some cases
            //msvd = (new SVD_DotNumerics()).SVD(S);

            // ILNumerics :: Commercial version. Not working.
            //msvd = (new SVD_ILNumerics()).SVD(S);

            // NMath CenterSpace :: Commercial version. Signs are not matching
            //msvd = (new SVD_NMath()).SVD(S);

            // Extreme :: Commercial version. signs & values not matching
            //msvd = (new SVD_Extreme()).SVD(S);

            // FinMath :: Commercial version. Signs are not matching
            //msvd = (new SVD_FinMath()).SVD(S);

            // DotNetMatrix :: signs & values not matching
            //msvd = (new SVD_DotNetMatrix()).SVD(S);


            //#region printing svd values in Output window

            //Debug.WriteLine("S:");
            //for (int ix = 0; ix < msvd.S.Count; ix++)
            //    Debug.Write(msvd.S[ix] + "\t");
            //Debug.WriteLine("");
            //Debug.WriteLine("U:");
            //for (int ir = 0; ir < msvd.U.RowCount; ir++)
            //{
            //    for (int ic = 0; ic < msvd.U.ColumnCount; ic++)
            //    {
            //        Debug.Write(msvd.U[ir, ic] + "\t");
            //    }
            //    Debug.WriteLine("");
            //}
            //Debug.WriteLine("VT:");
            //for (int ir = 0; ir < msvd.VT.RowCount; ir++)
            //{
            //    for (int ic = 0; ic < msvd.VT.ColumnCount; ic++)
            //    {
            //        Debug.Write(msvd.VT[ir, ic] + "\t");
            //    }
            //    Debug.WriteLine("");
            //}
            //Debug.WriteLine("W:");
            //for (int ir = 0; ir < msvd.W.RowCount; ir++)
            //{
            //    for (int ic = 0; ic < msvd.W.ColumnCount; ic++)
            //    {
            //        Debug.Write(msvd.W[ir, ic] + "\t");
            //    }
            //    Debug.WriteLine("");
            //}


            //var mw = matrix.Multiply(matrix.Transpose()).Evd();

            ////Debug.WriteLine("Eigen Values(X):");
            ////for (int ir = 0; ir < mw.EigenValues.Count; ir++)
            ////{
            ////    Debug.Write(mw.EigenValues.ToArray()[ir] + "\t");

            ////    Debug.WriteLine("");
            ////}

            //Debug.WriteLine("Eigen Vectors(X):");
            //for (int ir = 0; ir < mw.EigenVectors.RowCount; ir++)
            //{
            //    for (int ic = 0; ic < mw.EigenVectors.ColumnCount; ic++)
            //    {
            //        Debug.Write(mw.EigenVectors[ir, ic] + "\t");
            //    }
            //    Debug.WriteLine("");
            //}


            //mw = matrix.Transpose().Multiply(matrix).Evd();

            ////Debug.WriteLine("Eigen Values(X):");
            ////for (int ir = 0; ir < mw.EigenValues.Count; ir++)
            ////{
            ////    Debug.Write(mw.EigenValues.ToArray()[ir] + "\t");

            ////    Debug.WriteLine("");
            ////}

            //Debug.WriteLine("Eigen Vectors(Y):");
            //for (int ir = 0; ir < mw.EigenVectors.RowCount; ir++)
            //{
            //    for (int ic = 0; ic < mw.EigenVectors.ColumnCount; ic++)
            //    {
            //        Debug.Write(mw.EigenVectors[ir, ic] + "\t");
            //    }
            //    Debug.WriteLine("");
            //}
            //#endregion

            // Standard coordinates
            _data.Columns.Add("Dim1 S.", typeof(double));
            _data.Columns.Add("Dim2 S.", typeof(double));
            // Principal coordinates
            _data.Columns.Add("Dim1 P.", typeof(double));
            _data.Columns.Add("Dim2 P.", typeof(double));
            // Processing rows
            double mass, U, V1, V2;
            for (int ir = 0; ir < _data.Rows.Count - 3; ir++)
            {
                for (int iu = 0; iu < 2; iu++)
                {
                    // Project using U vectors of SVD divided by the sqrt of mass
                    mass = (double)_data.Rows[ir][_data.Columns.Count - 7];
                    U = msvd.U[ir, iu]; // mathdotnet
                                        //U = alU[ir, iu]; // alglib
                    V1 = U / Math.Sqrt(mass);
                    _data.Rows[ir][iu + (_data.Columns.Count - 4)] = V1;
                    //// Principal coordinates using singular value
                    //V2 = V1 * svd.Diagonal[iu];
                    //V2 = V1 * msvd.W[ir, ir];
                    //_data.Rows[ir][iu + (_data.Columns.Count - 2)] = V2;
                }
            }
            // MathNet.Numerics.LinearAlgebra.Double.Matrix mm;

            // Same for columns
            DataRow row1s = _data.NewRow();
            row1s[0] = "Dim1 S.";
            DataRow row2s = _data.NewRow();
            row2s[0] = "Dim2 S.";
            DataRow row1p = _data.NewRow();
            row1p[0] = "Dim1 P.";
            DataRow row2p = _data.NewRow();
            row2p[0] = "Dim2 P.";
            for (int ic = 1; ic < _data.Columns.Count - 7; ic++)
            {
                mass = (double)_data.Rows[_data.Rows.Count - 3][ic];
                V1 = msvd.VT[0, ic - 1]; // mathdotnet
                                         //V1 = alVT[0, ic - 1]; // alglib
                V1 = V1 / Math.Sqrt(mass);
                row1s[ic] = V1;
                V2 = msvd.VT[1, ic - 1] / Math.Sqrt(mass); // mathdotnet
                                                           //V2 = alVT[1, ic - 1] / Math.Sqrt(mass); // alglib
                row2s[ic] = V2;
                //// Principal coordinates
                //row2p[ic] = V2 * svd.Diagonal[1];
                //row2p[ic] = V2 * msvd.W[1, 1];
            }

            _data.Rows.Add(row1s);
            _data.Rows.Add(row2s);
            _data.Rows.Add(row1p);
            _data.Rows.Add(row2p);
            //// Calculate total inertias for each dimension (row standard coordinates * contingency table * column standard coordinates)
            //for (int iu = 0; iu < 2; iu++)
            //{
            //    double itotal = 0;
            //    for (int ic = 1; ic < _data.Columns.Count - 7; ic++)
            //    {
            //        double rtmp = 0;
            //        for (int ir = 0; ir < _data.Rows.Count - 7; ir++)
            //        {
            //            rtmp += (double)_data.Rows[ir][ic] * (double)_data.Rows[ir][iu + (_data.Columns.Count - 4)];
            //        }
            //        itotal += rtmp * (double)_data.Rows[iu + (_data.Rows.Count - 4)][ic];
            //    }
            //    // Put in the inertia row and column
            //    _data.Rows[_data.Rows.Count - 5][iu + (_data.Columns.Count - 4)] = itotal * itotal;
            //    _data.Rows[iu + (_data.Rows.Count - 4)][_data.Columns.Count - 5] = itotal * itotal;
            //}
            #endregion

            #region "removing additional columns"
            _data.Columns.RemoveAt(_data.Columns.Count - 1);
            _data.Columns.RemoveAt(_data.Columns.Count - 1);
            _data.Columns.RemoveAt(_data.Columns.Count - 3);
            _data.Columns.RemoveAt(_data.Columns.Count - 4);
            //_data.Columns.RemoveAt(_data.Columns.Count - 3);

            _data.Rows.RemoveAt(_data.Rows.Count - 1);
            _data.Rows.RemoveAt(_data.Rows.Count - 1);
            _data.Rows.RemoveAt(_data.Rows.Count - 3);
            _data.Rows.RemoveAt(_data.Rows.Count - 4);
            //_data.Rows.RemoveAt(_data.Rows.Count - 3);
            #endregion

            #region "copying calcualted values in result table"

            for (int ir = 0; ir < _data.Rows.Count - 2; ir++)
            {
                _result.Rows.Add(_data.Rows[ir][0].ToString(), _data.Rows[ir]["Dim1 S."] == DBNull.Value ? 0 : (double)_data.Rows[ir]["Dim1 S."], _data.Rows[ir]["Dim2 S."] == DBNull.Value ? 0 : (double)_data.Rows[ir]["Dim2 S."], _data.Rows[ir]["Chi-Dist"] == DBNull.Value ? 0 : (double)_data.Rows[ir]["Chi-Dist"]);
            }
            for (int ic = 1; ic < _data.Columns.Count - 2; ic++)
            {
                _result.Rows.Add(_data.Columns[ic].ColumnName, _data.Rows[_data.Rows.Count - 2][ic] == DBNull.Value ? 0 : (double)_data.Rows[_data.Rows.Count - 2][ic], _data.Rows[_data.Rows.Count - 1][ic] == DBNull.Value ? 0 : (double)_data.Rows[_data.Rows.Count - 1][ic], _data.Rows[_data.Rows.Count - 3][ic] == DBNull.Value ? 0 : (double)_data.Rows[_data.Rows.Count - 3][ic]);
            }

            _result.Rows.RemoveAt(CrossTab.Rows.Count);
            _result.Rows.RemoveAt(_result.Rows.Count - 1);

            #endregion

            return _result;
        }

        #region Correlation block

        /// <summary>
        /// Computes correlation between two columns of a data table and returns a value. Null values in the input table are ignored for calculation.
        /// </summary>
        /// <param name="InputTable"></param>
        /// <param name="Column1"></param>
        /// <param name="Column2"></param>
        /// <returns></returns>
        public static double Correlation(DataTable InputTable, string Column1, string Column2)
        {
            List<double> List1 = new List<double>();
            List<double> List2 = new List<double>();
            ColumnToList(InputTable, InputTable.Columns[Column1].Ordinal, ref List1);
            ColumnToList(InputTable, InputTable.Columns[Column2].Ordinal, ref List2);
            return Correlation(List1, List2);
        }

        /// <summary>
        ///  Computes correlation between two lists and returns a value. Null values in the input lists can be passed as double.NaN.
        /// </summary>
        /// <param name="List1"></param>
        /// <param name="List2"></param>
        /// <returns></returns>
        public static double Correlation(List<double> List1, List<double> List2)
        {
            if (List1 == null || List2 == null || List1.Count == 0 || List2.Count == 0)
                return 0;  // no correlation between the lists. may consider to send NaN as well.
            ValidatePairs(List1, List2);
            return MathNet.Numerics.Statistics.Correlation.Pearson(List1, List2);
        }

        /// <summary>
        /// Computes correlation between columns and returns a table with respective values as result. Null values in the input table are ignored for calculation.
        /// </summary>
        /// <param name="InputTable"></param>
        /// <returns></returns>
        public static DataTable Correlation(DataTable InputTable)
        {
            if (InputTable == null || InputTable.Rows.Count == 0 || InputTable.Columns.Count == 0)
                return null;

            // copying data to another table with double datatype
            DataTable _data = InputTable.Clone();
            for (int ic = 0; ic < _data.Columns.Count; ic++)
            {
                if (_data.Columns[ic].DataType.Name != "Double")
                    _data.Columns[ic].DataType = typeof(double);
            }
            foreach (DataRow tr in InputTable.Rows)
            {
                _data.ImportRow(tr);
            }

            // result table
            DataTable _result = new DataTable();
            _result.Columns.Add(new DataColumn("Name", typeof(string)));
            foreach (DataColumn dc in InputTable.Columns)
            {
                _result.Columns.Add(new DataColumn(dc.ColumnName, typeof(double)));
            }
            DataRow nrow;
            List<double> col1 = new List<double>(), col2 = new List<double>(); double result;
            for (int cidx = 0; cidx < _data.Columns.Count; cidx++)
            {
                nrow = _result.NewRow();
                nrow[0] = _data.Columns[cidx].ColumnName;
                for (int ic = 0; ic <= cidx; ic++)
                {
                    ColumnToList(_data, cidx, ref col1);
                    ColumnToList(_data, ic, ref col2);
                    ValidatePairs(col1, col2);
                    result = MathNet.Numerics.Statistics.Correlation.Pearson(col1, col2);
                    nrow[ic + 1] = result;
                }
                _result.Rows.Add(nrow);
            }
            return _result;
        }

        private static void ValidatePairs(List<double> List1, List<double> List2)
        {
            for (int cnt = List1.Count - 1; cnt > -1; cnt--)
            {
                if (double.IsNaN(List1[cnt]) || double.IsNaN(List2[cnt]))
                {
                    List1.RemoveAt(cnt);
                    List2.RemoveAt(cnt);
                }
            }
        }

        private static void ColumnToList(DataTable datatable, int colIndex, ref List<double> destList)
        {
            destList = datatable.AsEnumerable().Select(x => x[colIndex] != DBNull.Value ? double.Parse(x[colIndex].ToString()) : double.NaN).ToList();

            //    object obj;
            //    foreach (DataRow dr in dt.Rows)
            //    {
            //        obj = dr[colIndex];
            //        if (obj != DBNull.Value)
            //            dest.Add(double.Parse(obj.ToString()));
            //        //else
            //        //    dest.Add(null);
            //    }
        }

        #endregion

    }

    internal class SvdMatrix
    {
        internal MathNet.Numerics.LinearAlgebra.Matrix<double> U { get; set; }
        internal MathNet.Numerics.LinearAlgebra.Matrix<double> VT { get; set; }
    }

}