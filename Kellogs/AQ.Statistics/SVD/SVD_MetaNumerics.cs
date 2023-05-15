using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AQ
{
    class SVD_MetaNumerics
    {
        internal SvdMatrix SVD(double[,] S)
        {
            SvdMatrix result = new AQ.SvdMatrix();
            //double[,] arrU;
            //double[,] arrVT;

            //Meta.Numerics.Matrices.RectangularMatrix matrix = new Meta.Numerics.Matrices.RectangularMatrix(S);
            //Meta.Numerics.Matrices.SingularValueDecomposition svd = matrix.SingularValueDecomposition();
            //Meta.Numerics.Matrices.SquareMatrix matU = svd.LeftTransformMatrix();
            //Meta.Numerics.Matrices.SquareMatrix matVT = svd.RightTransformMatrix();
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
