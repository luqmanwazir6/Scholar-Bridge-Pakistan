/**
 * CSV Export Utility - Triggers in-browser Blob download
 */

export const exportToCSV = (filename, rows, columns) => {
  if (!rows || !rows.length) {
    alert("No data available to export.");
    return;
  }

  // Header row
  const headerLabels = columns.map(col => `"${col.label.replace(/"/g, '""')}"`).join(",");

  // Data rows
  const csvRows = rows.map(row => {
    return columns.map(col => {
      let val = "";
      if (typeof col.accessor === "function") {
        val = col.accessor(row);
      } else if (col.key && row[col.key] !== undefined && row[col.key] !== null) {
        val = row[col.key];
      }
      val = String(val).replace(/"/g, '""');
      return `"${val}"`;
    }).join(",");
  });

  const csvContent = "\uFEFF" + [headerLabels, ...csvRows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
