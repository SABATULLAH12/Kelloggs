using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AQ
{
    class SVD_FinMath
    {
        internal SvdMatrix SVD(double[,] S)
        {
            SvdMatrix result = new AQ.SvdMatrix();
            //double[,] arrU;
            //double[,] arrVT;

            //FinMath.LinearAlgebra.Matrix matrix = new FinMath.LinearAlgebra.Matrix(S);
            //FinMath.LinearAlgebra.Factorizations.SVD svd = FinMath.LinearAlgebra.Factorizations.SVD.FullSVD(matrix);
            //FinMath.LinearAlgebra.Matrix matU = svd.U();
            //FinMath.LinearAlgebra.Matrix matVT = svd.VT();

            //arrU = matU.GetValues();
            //arrVT = matVT.GetValues();

            //MathNet.Numerics.LinearAlgebra.Matrix<double> Uvalue = MathNet.Numerics.LinearAlgebra.Double.DenseMatrix.OfArray(arrU);
            //MathNet.Numerics.LinearAlgebra.Matrix<double> VTvalue = MathNet.Numerics.LinearAlgebra.Double.DenseMatrix.OfArray(arrVT);

            //result.U = Uvalue;
            //result.VT = VTvalue;
            return result;
        }
    }
}
