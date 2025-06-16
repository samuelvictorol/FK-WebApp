import html2pdf from "html2pdf.js";

const Utils = {
  gerarPDF: (titulo, descricao, tipo) => {
    const content = `
            <div style="font-family: Arial; padding: 20px; width: 100%; box-sizing: border-box;">
              <h2 style="color: #1976D2">${titulo || ""}</h2>
              <p>${(descricao || "").replace(/\n/g, "<br>")}</p>
            </div>
          `;
    const opt = {
      margin: 0.5,
      filename: `${tipo}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(content).set(opt).save();
  },
};

export { Utils };
