using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AQ
{
    class SVD_MathNet
    {
        internal SvdMatrix SVD(double[,] S)
        {
            var matrix = MathNet.Numerics.LinearAlgebra.Double.Matrix.Build.DenseOfArray(S);
            var svd = matrix.Svd();
            SvdMatrix result = new AQ.SvdMatrix();
            result.U = svd.U;
            result.VT = svd.VT;
            return result;
        }
    }
}
