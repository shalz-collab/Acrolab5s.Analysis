import { jsPDF } from "jspdf";
import type { AnalysisResult } from "./analysis";

export async function generateReport(
  result: AnalysisResult,
  beforeSrc?: string | null,
  afterSrc?: string | null
) {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("ArcoLabs – 5S Analysis Report", margin, y);
  y += 12;

  doc.setDrawColor(76, 141, 105);
  doc.setLineWidth(0.5);
  doc.line(margin, y, 190, y);
  y += 10;

  // Helper to load image as data URL
  const loadImage = (src: string): Promise<string> =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d")!.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = () => resolve("");
      img.src = src;
    });

  // Images
  if (beforeSrc || afterSrc) {
    const imgWidth = 80;
    const imgHeight = 55;
    if (beforeSrc) {
      const data = await loadImage(beforeSrc);
      if (data) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("Before", margin, y);
        y += 3;
        doc.addImage(data, "JPEG", margin, y, imgWidth, imgHeight);
      }
    }
    if (afterSrc) {
      const data = await loadImage(afterSrc);
      if (data) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("After", margin + 90, beforeSrc ? y - 3 : y);
        if (!beforeSrc) y += 3;
        doc.addImage(data, "JPEG", margin + 90, y, imgWidth, imgHeight);
      }
    }
    y += 62;
  }

  // Summary
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Analysis Summary", margin, y);
  y += 7;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const summaryLines = doc.splitTextToSize(result.summary, 170);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 5 + 8;

  // Scores
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("5S Scores", margin, y);
  y += 7;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const scoreLabels = [
    ["Sort", result.scores.sort],
    ["Set in Order", result.scores.setInOrder],
    ["Shine", result.scores.shine],
    ["Standardize", result.scores.standardize],
    ["Sustain", result.scores.sustain],
  ] as const;
  scoreLabels.forEach(([label, score]) => {
    doc.text(`${label}: ${score}%`, margin, y);
    y += 6;
  });
  y += 5;

  // Recommendations
  if (y > 250) { doc.addPage(); y = margin; }
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Recommendations", margin, y);
  y += 7;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  result.recommendations.forEach((rec, i) => {
    if (y > 275) { doc.addPage(); y = margin; }
    const lines = doc.splitTextToSize(`${i + 1}. ${rec}`, 170);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 3;
  });

  doc.save("ArcoLabs_5S_Report.pdf");
}
