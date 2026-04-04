import html2pdf from "html2pdf.js";

const Utils = {
  gerarPDF: (resultadoForm, tipo = "resultado_formulario") => {
    const data = normalizeResultado(resultadoForm);
    const horarioGerado = formatDateTime(new Date());

    const historicoHtml = data.historico.length
      ? data.historico.map((item, index) => `
          <div class="qa-item">
            <div class="qa-index">${index + 1}</div>
            <div class="qa-content">
              <div class="qa-question">${escapeHtml(item.pergunta || "Pergunta não informada")}</div>
              <div class="qa-answer-label">Resposta</div>
              <div class="qa-answer">${escapeHtml(item.resposta || "Sem resposta")}</div>
            </div>
          </div>
        `).join("")
      : `
        <div class="empty-box">
          Nenhum histórico de perguntas e respostas foi encontrado.
        </div>
      `;

    const content = `
      <div class="pdf-root">
        <div class="pdf-header">
          <div class="brand-block">
            <div class="brand-pill">RELATÓRIO</div>
            <h1 class="main-title">${escapeHtml(data.titulo || "Resultado do Formulário")}</h1>
            <div class="meta-list">
              <div><strong>Formulário:</strong> ${escapeHtml(data.nomeFormulario || tipo)}</div>
              <div><strong>Gerado em:</strong> ${escapeHtml(horarioGerado)}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Resultado</div>
          <div class="result-box">
            ${data.descricaoHtml}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Histórico de perguntas e respostas</div>
          <div class="section-subtitle">
            Resumo completo das respostas registradas no formulário.
          </div>
          ${historicoHtml}
        </div>

        <div class="pdf-footer">
          Documento gerado automaticamente em ${escapeHtml(horarioGerado)}
        </div>
      </div>
    `;

    const wrappedContent = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            body {
              margin: 0;
              padding: 0;
              font-family: Arial, Helvetica, sans-serif;
              color: #1f2937;
              background: #ffffff;
            }

            .pdf-root {
              width: 100%;
              padding: 28px 26px 22px 26px;
              background: #ffffff;
            }

            .pdf-header {
              background: linear-gradient(135deg, #6d28d9 0%, #0f766e 100%);
              color: #ffffff;
              border-radius: 18px;
              padding: 24px;
              margin-bottom: 22px;
            }

            .brand-pill {
              display: inline-block;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 1.2px;
              padding: 6px 10px;
              border-radius: 999px;
              background: rgba(255, 255, 255, 0.18);
              margin-bottom: 12px;
            }

            .main-title {
              margin: 0;
              font-size: 24px;
              line-height: 1.2;
            }

            .meta-list {
              margin-top: 14px;
              font-size: 12px;
              line-height: 1.6;
              color: rgba(255,255,255,0.95);
            }

            .section {
              margin-bottom: 22px;
            }

            .section-title {
              font-size: 18px;
              font-weight: 700;
              color: #111827;
              margin-bottom: 8px;
            }

            .section-subtitle {
              font-size: 12px;
              color: #6b7280;
              margin-bottom: 14px;
            }

            .result-box {
              border: 1px solid #ddd6fe;
              background: #f8f5ff;
              border-radius: 14px;
              padding: 16px;
              line-height: 1.6;
              font-size: 13px;
            }

            .result-box strong {
              color: #4c1d95;
            }

            .qa-item {
              display: table;
              width: 100%;
              border: 1px solid #e5e7eb;
              border-radius: 14px;
              margin-bottom: 12px;
              overflow: hidden;
              page-break-inside: avoid;
            }

            .qa-index {
              display: table-cell;
              width: 52px;
              text-align: center;
              vertical-align: top;
              padding: 16px 10px;
              background: linear-gradient(180deg, #ede9fe 0%, #ecfeff 100%);
              font-weight: 700;
              color: #4c1d95;
              font-size: 16px;
            }

            .qa-content {
              display: table-cell;
              padding: 14px 16px;
              vertical-align: top;
              background: #ffffff;
            }

            .qa-question {
              font-size: 14px;
              font-weight: 700;
              color: #111827;
              margin-bottom: 10px;
              line-height: 1.45;
            }

            .qa-answer-label {
              font-size: 11px;
              font-weight: 700;
              letter-spacing: .5px;
              text-transform: uppercase;
              color: #6b7280;
              margin-bottom: 4px;
            }

            .qa-answer {
              font-size: 13px;
              line-height: 1.55;
              color: #1f2937;
              background: #f9fafb;
              border: 1px solid #eef2f7;
              border-radius: 10px;
              padding: 10px 12px;
            }

            .empty-box {
              border: 1px dashed #cbd5e1;
              border-radius: 12px;
              padding: 14px;
              font-size: 13px;
              color: #6b7280;
              background: #f8fafc;
            }

            .pdf-footer {
              margin-top: 26px;
              padding-top: 12px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              font-size: 11px;
              color: #6b7280;
            }

            p {
              margin: 0 0 10px 0;
            }

            ul, ol {
              margin: 8px 0 8px 18px;
            }

            li {
              margin-bottom: 6px;
            }

            br {
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;

    const opt = {
      margin: [0.2, 0.2, 0.2, 0.2],
      filename: `${sanitizeFileName(tipo)}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait"
      },
      pagebreak: {
        mode: ["css", "legacy"]
      }
    };

    html2pdf().from(wrappedContent).set(opt).save();
  },
};

function normalizeResultado(resultadoForm) {
  const raw = resultadoForm || {};

  const titulo = raw.titulo || "Resultado do Formulário";
  const nomeFormulario = raw.nomeFormulario || raw.formType || raw.tipo || "";
  const historicoFonte = Array.isArray(raw.historico)
    ? raw.historico
    : Array.isArray(raw.formContent)
      ? raw.formContent
      : [];

  const historico = historicoFonte.map((item) => ({
    pergunta: item?.pergunta || item?.question || "",
    resposta: item?.resposta || item?.answer || item?.option || ""
  }));

  return {
    titulo,
    nomeFormulario,
    historico,
    descricaoHtml: normalizeDescricao(raw.descricao || "")
  };
}

function normalizeDescricao(descricao) {
  const texto = String(descricao || "").trim();

  if (!texto) {
    return "<p>Resultado não informado.</p>";
  }

  const contemHtml = /<\/?[a-z][\s\S]*>/i.test(texto);
  if (contemHtml) {
    return texto;
  }

  return `<p>${escapeHtml(texto).replace(/\n/g, "<br>")}</p>`;
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium"
  }).format(date);
}

function sanitizeFileName(value) {
  return String(value || "arquivo")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


export { Utils };