using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AQ
{
    class SVD_Alglib
    {
        internal SvdMatrix SVD(double[,] S)
        {
            SvdMatrix result = new AQ.SvdMatrix();
            double[] arrW = { 0 };
            double[,] arrU = { { 0, 0 } };
            double[,] arrVT = { { 0, 0 } };

            //alglib.svd.rmatrixsvd(S, S.GetLength(0), S.GetLength(1), 1, 1, 1, ref arrW, ref arrU, ref arrVT);
            
            MathNet.Numerics.LinearAlgebra.Matrix<double> Uvalue = MathNet.Numerics.LinearAlgebra.Double.DenseMatrix.OfArray(arrU);
            MathNet.Numerics.LinearAlgebra.Matrix<double> VTvalue = MathNet.Numerics.LinearAlgebra.Double.DenseMatrix.OfArray(arrVT);

            result.U = Uvalue;
            result.VT = VTvalue;

            return result;
        }
    }
}
