using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AQ
{
    class SVD_DotNetMatrix
    {
        internal SvdMatrix SVD(double[,] S)
        {
            SvdMatrix result = new AQ.SvdMatrix();
            //double[,] arrU;
            //double[,] arrVT;

            //DotNetMatrix.GeneralMatrix matrix = new DotNetMatrix.GeneralMatrix(CopyToJaggedArray(S));
            //DotNetMatrix.SingularValueDecomposition svd = matrix.SVD();

            //arrU = CopyTo2DArray(svd.GetU().ArrayCopy);
            //arrVT = CopyTo2DArray(svd.GetU().ArrayCopy);

            //MathNet.Numerics.LinearAlgebra.Matrix<double> Uvalue = MathNet.Numerics.LinearAlgebra.Double.DenseMatrix.OfArray(arrU);
            //MathNet.Numerics.LinearAlgebra.Matrix<double> VTvalue = MathNet.Numerics.LinearAlgebra.Double.DenseMatrix.OfArray(arrVT);

            //result.U = Uvalue;
            //result.VT = VTvalue;
            return result;
        }

        private double[][] CopyToJaggedArray(double[,] twoDimensionalArray)
        {
            int rowsFirstIndex = twoDimensionalArray.GetLowerBound(0);
            int rowsLastIndex = twoDimensionalArray.GetUpperBound(0);
            int numberOfRows = rowsLastIndex + 1;

            int columnsFirstIndex = twoDimensionalArray.GetLowerBound(1);
            int columnsLastIndex = twoDimensionalArray.GetUpperBound(1);
            int numberOfColumns = columnsLastIndex + 1;

            double[][] jaggedArray = new double[numberOfRows][];
            for (int i = rowsFirstIndex; i <= rowsLastIndex; i++)
            {
                jaggedArray[i] = new double[numberOfColumns];

                for (int j = columnsFirstIndex; j <= columnsLastIndex; j++)
                {
                    jaggedArray[i][j] = twoDimensionalArray[i, j];
                }
            }
            return jaggedArray;
        }

        private double[,] CopyTo2DArray(double[][] source)
        {
            try
            {
                int FirstDim = source.Length;
                int SecondDim = source.GroupBy(row => row.Length).Single().Key; // throws InvalidOperationException if source is not rectangular

                var result = new double[FirstDim, SecondDim];
                for (int i = 0; i < FirstDim; ++i)
                    for (int j = 0; j < SecondDim; ++j)
                        result[i, j] = source[i][j];

                return result;
            }
            catch (InvalidOperationException)
            {
                throw new InvalidOperationException("The given jagged array is not rectangular.");
            }
        }
    }
}
