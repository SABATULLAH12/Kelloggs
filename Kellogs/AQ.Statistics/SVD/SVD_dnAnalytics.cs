using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AQ
{
    class SVD_dnAnalytics
    {
        internal SvdMatrix SVD(double[,] S)
        {
            SvdMatrix result = new AQ.SvdMatrix();
            //double[,] arrU;
            //double[,] arrVT;

            //dnAnalytics.LinearAlgebra.Matrix matrix = new dnAnalytics.LinearAlgebra.DenseMatrix(S);
            //dnAnalytics.LinearAlgebra.Decomposition.Svd svd = new dnAnalytics.LinearAlgebra.Decomposition.Svd(matrix, true);
            //dnAnalytics.LinearAlgebra.Matrix matU = svd.U();
            //dnAnalytics.LinearAlgebra.Matrix matVT = svd.VT();

            //arrU = matU.ToArray();
            //arrVT = matVT.ToArray();

            //MathNet.Numerics.LinearAlgebra.Matrix<double> Uvalue = MathNet.Numerics.LinearAlgebra.Double.DenseMatrix.OfArray(arrU);
            //MathNet.Numerics.LinearAlgebra.Matrix<double> VTvalue = MathNet.Numerics.LinearAlgebra.Double.DenseMatrix.OfArray(arrVT);

            //result.U = Uvalue;
            //result.VT = VTvalue;
            return result;
        }
    }
}
