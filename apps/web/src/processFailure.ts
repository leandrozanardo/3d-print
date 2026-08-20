/** Map engine failures to a visible diagnosis. Never drop the engine message. */

export type FormattedProcessFailure = {
  title: string;
  message: string;
  technicalLine: string;
};

const TITLE = "Não foi possível processar o arquivo";

function explain(code: string, technical: string): string | null {
  const haystack = `${code} ${technical}`;
  if (/EMPTY_FILE|empty buffer|empty 3MF/i.test(haystack)) {
    return "O arquivo está vazio.";
  }
  if (/NO_FILE_BUFFER/i.test(haystack)) {
    return "O arquivo não está mais na memória. Envie o arquivo novamente.";
  }
  if (/UNSUPPORTED_FORMAT|FORMAT_UNSUPPORTED|FORMAT_MISMATCH/i.test(haystack)) {
    return "Formato não suportado. Envie um arquivo 3MF ou STL.";
  }
  if (/MISSING_MODEL/i.test(haystack)) {
    return "Este 3MF não contém uma malha (.model). Costuma ser um projeto de fatiador, não o modelo.";
  }
  if (/MISSING_OBJECT/i.test(haystack)) {
    return "O 3MF referencia um objeto em outro arquivo do pacote (extensão Production / p:path).";
  }
  if (/EMPTY_GEOMETRY/i.test(haystack)) {
    return "O arquivo abriu, mas não há triângulos no build.";
  }
  if (/INVALID_ZIP|not a valid ZIP|missing ZIP magic/i.test(haystack)) {
    return "O pacote 3MF não é um ZIP válido.";
  }
  if (/INVALID_MODEL_XML/i.test(haystack)) {
    return "O XML do modelo 3MF é inválido ou não segue o schema Core.";
  }
  if (/INVALID_VERTEX/i.test(haystack)) {
    return "Há vértice com coordenada inválida na malha.";
  }
  if (/INVALID_TRIANGLE/i.test(haystack)) {
    return "Há triângulo com índices fora da malha.";
  }
  if (/CYCLIC_COMPONENTS/i.test(haystack)) {
    return "Os componentes do 3MF formam um ciclo e não podem ser resolvidos.";
  }
  if (/BUILD_VOLUME|EXCEEDS/i.test(haystack)) {
    return "O modelo não cabe no volume da impressora com nenhuma orientação.";
  }
  if (/ARCHIVE_BOMB|too many zip|compression ratio|uncompressed size/i.test(haystack)) {
    return "O pacote 3MF excedeu os limites de segurança do arquivo.";
  }
  if (/UNSAFE|REPO_BOUNDARY|DTD|ENTITY/i.test(haystack)) {
    return "O pacote 3MF é inválido ou inseguro.";
  }
  if (/XML nesting depth/i.test(haystack)) {
    return "O XML do 3MF ultrapassou a profundidade máxima permitida.";
  }
  if (/OUTPUT_REOPEN|OUTPUT_VALIDATION/i.test(haystack)) {
    return "O arquivo de saída gerado não passou na validação.";
  }
  if (/WORKER_CRASHED|Invalid worker request/i.test(haystack)) {
    return "O motor de geometria falhou ao iniciar ou processar o job.";
  }
  if (/CANCEL/i.test(haystack)) {
    return "Processamento cancelado.";
  }
  if (/INPUT_TOO_LARGE|FILE_TOO_LARGE/i.test(haystack)) {
    return "O arquivo ou o XML excedeu o tamanho máximo permitido.";
  }
  return null;
}

export function formatProcessFailure(
  code: string,
  technical: string,
): FormattedProcessFailure {
  const exact = technical.trim();
  const technicalLine = exact.length > 0 ? `${code}: ${exact}` : code;
  const hint = explain(code, exact);
  const message = hint ? `${hint} (${exact || code})` : exact || code;
  return {
    title: TITLE,
    message,
    technicalLine,
  };
}
