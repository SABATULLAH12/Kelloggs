using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
//using NLapack.Matrices;
//using MLapack;

namespace AQ
{
    class SVD_NLapack
    {
        internal SvdMatrix SVD(double[,] S)
        {
            SvdMatrix result = new AQ.SvdMatrix();
            //double[] arrW = { 0 };
            //double[,] arrU = { { 0, 0 } };
            //double[,] arrVT = { { 0, 0 } };

            //var matrix1 = new NRealMatrix(S.GetLength(0), S.GetLength(1));
            //for (int r = 0; r < S.GetLength(0); r++)
            //{
            //    for (int c = 0; c < S.GetLength(1); c++)
            //    {
            //        matrix1[r, c] = S[r, c];
            //    }
            //}

            //var s = new NRealMatrix();
            //var u = new NRealMatrix();
            //var vt = new NRealMatrix();

            //var lib = new NLapack.NLapackLib();
            //lib.SvdDecomposition(matrix1, s, u, vt);

            //MathNet.Numerics.LinearAlgebra.Matrix<double> Uvalue = MathNet.Numerics.LinearAlgebra.Double.DenseMatrix.OfArray(arrU);
            //MathNet.Numerics.LinearAlgebra.Matrix<double> VTvalue = MathNet.Numerics.LinearAlgebra.Double.DenseMatrix.OfArray(arrVT);

            //result.U = Uvalue;
            //result.VT = VTvalue;

            return result;
        }
    }
}
