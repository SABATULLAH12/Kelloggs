/*
 * SonarQube, open source software quality management tool.
 * Copyright (C) 2008-2013 SonarSource
 * mailto:contact AT sonarsource DOT com
 *
 * SonarQube is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * SonarQube is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

using System.Collections.Generic;

namespace AQ.Kelloggs.Models.Snapshot
{
    public class SnapshotResponse
    {
        public IList<ResponseData> DataList { get; set; }
    }

    #region Snapshot
    public class ResponseData
    {
        public int WidgetNumber { get; set; }
        public int ProfileOrder { get; set; }
        public string Attribute { get; set; }
        public int? USampleSize { get; set; }
        public int? USampleSizeTotal { get; set; }
        public int? USampleSizeHome { get; set; }
        public double? WSampleSize { get; set; }
        public double? WSampleSizeTotal { get; set; }
        public double? WSampleSizeHome { get; set; }
        public int? UNumerator { get; set; }
        public int? UNumeratorTotal { get; set; }
        public int? UNumeratorHome { get; set; }
        public double? WNumerator { get; set; }
        public double? WNumeratorTotal { get; set; }
        public double? WNumeratorHome { get; set; }

        public double? Volume { get; set; }
        public double? DiffVol { get; set; }
        public double? VolumeHome { get; set; }
        public double? DiffVolHome { get; set; }
        public double? VolumeTotal { get; set; }
        public double? DiffVolTotal { get; set; }
        public int? Significance { get; set; }
    }
    #endregion

}
