using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AQ
{
    class SVD_AccordMath
    {
        internal SvdMatrix SVD(double[,] S)
        {
            SvdMatrix result = new AQ.SvdMatrix();
            //double[,] arrU;
            //double[,] arrVT;

            //Accord.Math.Decompositions.SingularValueDecomposition svd = new Accord.Math.Decompositions.SingularValueDecomposition(S);
            //arrU = svd.LeftSingularVectors;
            //arrVT = svd.RightSingularVectors;

            //MathNet.Numerics.LinearAlgebra.Matrix<double> Uvalue = MathNet.Numerics.LinearAlgebra.Double.DenseMatrix.OfArray(arrU);
            //MathNet.Numerics.LinearAlgebra.Matrix<double> VTvalue = MathNet.Numerics.LinearAlgebra.Double.DenseMatrix.OfArray(arrVT);

            //result.U = Uvalue;
            //result.VT = VTvalue;
            return result;
        }
    }
}
