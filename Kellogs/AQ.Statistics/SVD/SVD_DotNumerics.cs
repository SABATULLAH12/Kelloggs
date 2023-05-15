using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AQ
{
    class SVD_DotNumerics
    {
        internal SvdMatrix SVD(double[,] S)
        {
            SvdMatrix result = new AQ.SvdMatrix();
            //double[,] arrU;
            //double[,] arrVT;
            //DotNumerics.LinearAlgebra.Matrix matS, matU, matVT;

            //DotNumerics.LinearAlgebra.Matrix matrix = new DotNumerics.LinearAlgebra.Matrix(S);
            //DotNumerics.LinearAlgebra.SingularValueDecomposition svd = new DotNumerics.LinearAlgebra.SingularValueDecomposition();
            //svd.ComputeSVD(matrix, out matS, out matU, out matVT);

            //arrU = matU.CopyToArray();
            //arrVT = matVT.CopyToArray();

            //MathNet.Numerics.LinearAlgebra.Matrix<double> Uvalue = MathNet.Numerics.LinearAlgebra.Double.DenseMatrix.OfArray(arrU);
            //MathNet.Numerics.LinearAlgebra.Matrix<double> VTvalue = MathNet.Numerics.LinearAlgebra.Double.DenseMatrix.OfArray(arrVT);

            //result.U = Uvalue;
            //result.VT = VTvalue;

            return result;
        }
    }
}
