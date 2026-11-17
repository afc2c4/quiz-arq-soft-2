import DOMPurify from 'dompurify';

/**
 * Sanitiza SVG gerado pelo Mermaid antes de inserir no DOM,
 * removendo scripts, foreignObject e manipuladores de eventos inline.
 */
export const sanitizeSvg = (rawSvg: string): string => {
  if (!rawSvg) return '';
  return DOMPurify.sanitize(rawSvg, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_TAGS: ['style'],
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'foreignObject'],
    FORBID_ATTR: [
      'onload',
      'onerror',
      'onclick',
      'onmouseover',
      'onmouseenter',
      'onmouseleave',
      'onfocus',
      'onblur',
    ],
  });
};

/**
 * Valida URLs renderizadas em links Markdown para bloquear esquemas perigosos (ex: javascript:, data:).
 */
export const getSafeUrl = (rawHref?: string): string | undefined => {
  if (!rawHref || typeof rawHref !== 'string') return undefined;
  const trimmed = rawHref.trim();
  if (!trimmed) return undefined;

  // Permite ancoras internas e caminhos relativos seguros
  if (trimmed.startsWith('#') || (trimmed.startsWith('/') && !trimmed.startsWith('//'))) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:' || parsed.protocol === 'mailto:') {
      return parsed.href;
    }
  } catch {
    return undefined;
  }

  return undefined;
};
