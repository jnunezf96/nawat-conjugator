// src/lessons/registry.js
// Curriculum metadata for the 58-lesson book sequence.
// This is NOT the physical architecture of the engine.
// Lessons are pedagogical entry points over the grammar engine.
//
// Status values:
//   "implemented"           — engine fully supports this domain
//   "partially-implemented" — some coverage, incomplete
//   "placeholder"           — no conjugation content or not yet mapped
//   "not-mapped"            — content exists in book but not in engine

const ANDREWS_TRAJECTORY_REDIRECT_ACTIONS = Object.freeze([
    "keep",
    "rename-visible-ui",
    "reframe-metadata",
    "diagnostic-only",
    "block-generation",
    "refactor-engine",
    "needs-nawat-evidence",
]);

const ANDREWS_PLAN_PURSUIT_AIM_STATUSES = Object.freeze([
    "queued",
    "shooting",
    "blocked",
    "closest-pass",
]);

const ANDREWS_PLAN_PURSUIT_ARROW_RESULTS = Object.freeze([
    "hit",
    "miss",
]);

const ANDREWS_TRAJECTORY_GROUPS = Object.freeze([
    {
        range: [1, 4],
        label: "Lecciones 1-4",
        directive: "Capa de fundamentos: usar Andrews para definir términos gramaticales, notación, partículas y límites de cláusula nuclear antes de hacer reclamos de interfaz o generación.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/concepts.test.js", "src/tests/orthography.test.js", "src/tests/particles.test.js", "src/tests/clause.test.js"],
    },
    {
        range: [5, 11],
        label: "Lecciones 5-11",
        directive: "Capa básica de cláusula verbal: Andrews dirige sujeto, objeto, tiempo, valencia, clase de tronco, límite oracional y categorías irregulares.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/agreement.test.js", "src/tests/vnc.test.js", "src/tests/preterit.test.js", "src/tests/sentence.test.js", "src/tests/irregulars.test.js"],
    },
    {
        range: [12, 19],
        label: "Lecciones 12-19",
        directive: "Capa básica de cláusula nominal: Andrews dirige contratos absolutivos, posesivos, de clase de tronco nominal, pronominales y de suplementación sin agregar posición de tiempo.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "src/tests/parsing.test.js"],
    },
    {
        range: [20, 27],
        label: "Lecciones 20-27",
        directive: "Capa de troncos verbales derivados: Andrews dirige límites de derivación no activa, pasiva, impersonal, de objeto, causativa, aplicativa y frecuentativa.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "src/tests/vnc.test.js", "src/tests/agreement.test.js"],
    },
    {
        range: [28, 34],
        label: "Lecciones 28-34",
        directive: "Capa de compuestos y troncos especiales: Andrews dirige límites de cláusula verbal/nominal compuesta, purposiva, afectiva, honorífica y numeral.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/parsing.test.js", "src/tests/nnc.test.js"],
    },
    {
        range: [35, 43],
        label: "Lecciones 35-43",
        directive: "Capa de formación nominal y adjetival: Andrews dirige límites de nominalización, patientivo, función adjetival y modificación.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "src/tests/nnc_adjectival.test.js", "src/tests/modification.test.js"],
    },
    {
        range: [44, 50],
        label: "Lecciones 44-50",
        directive: "Capa relacional y adverbial: Andrews dirige cláusulas nucleares adverbiales, cláusulas nominales relacionales, formas de lugar/gentilicio y adjunción.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/adverbial.test.js", "src/tests/adjunction.test.js"],
    },
    {
        range: [51, 58],
        label: "Lecciones 51-58",
        directive: "Capa de cláusula, denominal, nombres y miscelánea: Andrews dirige límites de complemento, conjunción, comparación, denominales, nombres y análisis.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/complement.test.js", "src/tests/conjunction.test.js"],
    },
]);

const ANDREWS_FOUNDATION_TRAJECTORY_OVERRIDES = Object.freeze({
    1: {
        pdfRefs: ["Andrews Lesson 1"],
        directive: "Usa Andrews Lección 1 como capa de sistema operativo gramatical: unidades de cláusula nuclear, notación, morfo/morfema/forma, tronco, acervo, afijo y términos de límite dirigen la arquitectura posterior del motor.",
        implementationState: "implemented-audited",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-diagnostic",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/concepts.test.js"],
    },
    2: {
        pdfRefs: ["Andrews Lesson 2.1-2.16"],
        directive: "Usa Andrews Lección 2 para las categorías clásicas de sonido y escritura, y luego enruta las superficies por el puente ortográfico Nawat/Pipil antes de cualquier realización Nawat.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/orthography.test.js"],
        plannedArrows: [
            {
                id: "lesson-2-subsection-coverage-audit",
                type: "metadata-diagnostic-test",
                aim: "Exponer Andrews Lección 2.1-2.16 como metadatos de cobertura por subsección, con transición abierta y estructura silábica separadas antes de cualquier reclamo de generación.",
                andrewsRefs: ["Andrews Lesson 2.1-2.16"],
                expectedFeedbackRefs: ["src/tests/orthography.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-2-subsection-coverage-audit",
                result: "hit",
                correction: "La cobertura de Lección 2 ahora lleva referencias de PDF por subsección, acciones de redirección, referencias de validación, política sin generación y marco de tiro Plan/Pursue.",
                andrewsRefs: ["Andrews Lesson 2.1-2.16"],
                feedbackRefs: ["src/tests/orthography.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen bloqueadas, solo diagnósticas o pendientes de evidencia Nawat: longitud vocálica, acento/prosodia, consonantes largas, alternancia glotal y elecciones ortográficas sensibles a evidencia.",
    },
    3: {
        pdfRefs: ["Andrews Lesson 3"],
        directive: "Usa Andrews Lección 3 para clasificar partículas como unidades menores sensibles a colocación; mantener modo Partícula como diagnóstico salvo que evidencia local Nawat confirme superficies y funciones.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-adapted-seed-only",
        validationRefs: ["src/tests/registry.test.js", "src/tests/particles.test.js"],
        plannedArrows: [
            {
                id: "lesson-3-pdf-example-transfer-audit",
                type: "metadata-diagnostic-test",
                aim: "Transferir los ejemplos restantes de colocación de partículas de Andrews Lección 3 al inventario semilla diagnóstico con adaptación ortográfica Nawat y sin permiso de generación.",
                andrewsRefs: ["Andrews Lesson 3.4"],
                expectedFeedbackRefs: ["src/tests/particles.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-3-pdf-example-transfer-audit",
                result: "hit",
                correction: "Los ejemplos faltantes de colocación de Lección 3.4 ahora están en el inventario semilla derivado de Andrews con glosas en español, formas visibles adaptadas ortográficamente y generación desactivada.",
                andrewsRefs: ["Andrews Lesson 3.4"],
                feedbackRefs: ["src/tests/particles.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen pendientes de evidencia: inventario local confirmado de partículas Nawat/Pipil, evidencia de colocación y generación; modo Partícula permanece solo diagnóstico.",
    },
    4: {
        pdfRefs: ["Andrews Lesson 4.1-4.6"],
        directive: "Usa Andrews Lección 4 para dirigir la arquitectura de cláusula nuclear: sujeto más predicado, marcos de cláusula verbal y nominal, límites de fórmula y ningún colapso a nivel de palabra.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/clause.test.js", "src/tests/ui.test.js"],
        plannedArrows: [
            {
                id: "lesson-4-subsection-coverage-audit",
                type: "metadata-diagnostic-test",
                aim: "Exponer Andrews Lección 4.1-4.6 como metadatos de arquitectura de cláusula verbal y nominal por subsección antes de tratar la interfaz de fórmula o los marcos del motor como implementados.",
                andrewsRefs: ["Andrews Lesson 4.1-4.6"],
                expectedFeedbackRefs: ["src/tests/clause.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-4-subsection-coverage-audit",
                result: "hit",
                correction: "El marco de Lección 4 ahora lleva referencias de PDF por subsección, directivas en español, acciones de redirección, referencias de validación y política sin generación.",
                andrewsRefs: ["Andrews Lesson 4.1-4.6"],
                feedbackRefs: ["src/tests/clause.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: sintaxis oracional, registro de datos de fórmula, contexto de referencia de tercera persona y paradigmas detallados de rellenador de cláusula verbal/nominal.",
    },
    5: {
        pdfRefs: ["Andrews Lesson 5.1-5.5"],
        directive: "Usa Andrews Lección 5 para dirigir la fórmula intransitiva de cláusula verbal, la distribución de la posición del pronombre de sujeto, el inventario de morfemas de tiempo y el límite de realización Nawat/Pipil.",
        implementationState: "implemented-audited",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/vnc.test.js"],
        plannedArrows: [
            {
                id: "lesson-5-intransitive-vnc-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 5.1-5.5 contra el motor intransitivo de cláusula verbal, las posiciones de sujeto, las rutas de morfemas de tiempo y el puente ortográfico Nawat.",
                andrewsRefs: ["Andrews Lesson 5.1-5.5"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-5-intransitive-vnc-audit",
                result: "hit",
                correction: "La Lección 5 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de fórmula intransitiva, paradigmas de rellenador de sujeto, inventario de morfemas de tiempo y política explícita de realización Nawat.",
                andrewsRefs: ["Andrews Lesson 5.1-5.5"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "none",
    },
    6: {
        pdfRefs: ["Andrews Lesson 6.1-6.7"],
        directive: "Usa Andrews Lección 6 para dirigir la valencia transitiva de cláusula verbal: categorías de pronombre objetivo, posiciones de valencia monádica y diádica, paradigmas de objeto proyectivo y límites de objeto reflexivo/recíproco.",
        implementationState: "implemented-audited",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/vnc.test.js", "src/tests/agreement.test.js", "src/tests/combo_validation.test.js"],
        plannedArrows: [
            {
                id: "lesson-6-transitive-vnc-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 6.1-6.7 contra el motor transitivo de cláusula verbal, categorías de objeto, posiciones de valencia monádica/diádica y realización Nawat de prefijos de objeto.",
                andrewsRefs: ["Andrews Lesson 6.1-6.7"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-6-transitive-vnc-audit",
                result: "hit",
                correction: "La Lección 6 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de fórmula de valencia monádica y diádica, marcos de categoría de objeto, paradigmas proyectivo/reflexivo y política explícita de realización Nawat.",
                andrewsRefs: ["Andrews Lesson 6.1-6.7"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "none",
    },
    7: {
        pdfRefs: ["Andrews Lesson 7.1-7.10"],
        directive: "Usa Andrews Lección 7 para dirigir la cita de núcleo verbal, la estructura morfémica del tronco verbal, la arquitectura de clases A/B/C/D, la formación predicativa perfectiva/imperfectiva, los límites de análisis de cláusula verbal, las relaciones de objeto y la derivación por fusión ta.",
        implementationState: "implemented-audited",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/vnc.test.js", "src/tests/preterit.test.js"],
        plannedArrows: [
            {
                id: "lesson-7-verbstem-class-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 7.1-7.10 contra cita de núcleo verbal, clases de tronco verbal, rutas de clase perfectiva/imperfectiva, marcos de análisis, relaciones de objeto y límites de derivación por fusión ta.",
                andrewsRefs: ["Andrews Lesson 7.1-7.10"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-7-verbstem-class-audit",
                result: "hit",
                correction: "La Lección 7 ahora lleva referencias de PDF por subsección, directivas en español, política de cita de núcleo verbal, marcos de clase A/B/C/D, inventario de formación predicativa, límites de análisis, metadatos de relación de objeto y política de derivación por fusión ta.",
                andrewsRefs: ["Andrews Lesson 7.1-7.10"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "none",
    },
    8: {
        pdfRefs: ["Andrews Lesson 8.1-8.6"],
        directive: "Usa Andrews Lección 8 para dirigir límites de prefijo de cláusula verbal expandida, categorías de oración básica frente a transformada, reglas de aserción afirmativa simple, comportamiento de aserción negativa/enfática y diagnósticos de pregunta sí/no.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-8-expanded-vnc-basic-sentence-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 8.1-8.6 contra colocación de límites de cláusula verbal expandida, categorías de oración básica/transformada y posiciones oracionales solo diagnósticas.",
                andrewsRefs: ["Andrews Lesson 8.1-8.6"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-8-expanded-vnc-basic-sentence-audit",
                result: "hit",
                correction: "La Lección 8 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de límites de cláusula verbal expandida, marcos de oración básica/transformada y bloqueos explícitos de generación para oraciones negativas, enfáticas y de pregunta sí/no.",
                andrewsRefs: ["Andrews Lesson 8.1-8.6"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen solo diagnósticas o pendientes de evidencia: generación oracional, realización confirmada de partículas Nawat/Pipil de la Lección 8 y controles generativos de prefijos direccionales/locativos de cláusula verbal.",
    },
    9: {
        pdfRefs: ["Andrews Lesson 9.1-9.9"],
        directive: "Usa Andrews Lección 9 para dirigir el uso optativo de cláusula verbal, oraciones de deseo, oraciones de mandato y exhortación, comportamiento de deseo negativo y el límite explícito de que el náhuatl no tiene modo imperativo.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-9-optative-sentence-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 9.1-9.9 contra uso optativo de cláusula verbal, oraciones de deseo, oraciones de mandato/exhortación y el límite sin modo imperativo.",
                andrewsRefs: ["Andrews Lesson 9.1-9.9"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-9-optative-sentence-audit",
                result: "hit",
                correction: "La Lección 9 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de uso optativo de cláusula verbal, marcos de deseo/deseo negativo, marcos de mandato/exhortación y bloqueos explícitos para tratar etiquetas finitas de imperativo como modo imperativo de Andrews.",
                andrewsRefs: ["Andrews Lesson 9.1-9.9"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen solo diagnósticas o pendientes de evidencia: generación oracional, realización confirmada de partículas Nawat/Pipil de la Lección 9 y replanteamiento visible, dirigido por Andrews, de etiquetas de compatibilidad de imperativo.",
    },
    10: {
        pdfRefs: ["Andrews Lesson 10.1-10.5"],
        directive: "Usa Andrews Lección 10 para dirigir el significado admonitivo de cláusula verbal, formación admonitiva no pasada, transformaciones oracionales admonitivas afirmativas y negativas, y diagnósticos de contraste con formas optativas e indicativas.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-10-admonitive-sentence-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 10.1-10.5 contra significado del modo admonitivo, formación admonitiva no pasada de cláusula verbal, transformaciones de oración admonitiva y diagnósticos de contraste admonitivo/optativo/indicativo.",
                andrewsRefs: ["Andrews Lesson 10.1-10.5"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-10-admonitive-sentence-audit",
                result: "hit",
                correction: "La Lección 10 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de modo admonitivo, formación admonitiva no pasada de cláusula verbal, marcos de admonición afirmativa/negativa y diagnósticos de contraste que bloquean tratar formas admonitivas como mandatos negativos.",
                andrewsRefs: ["Andrews Lesson 10.1-10.5"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen solo diagnósticas o pendientes de evidencia: generación oracional, realización confirmada de partículas Nawat/Pipil de la Lección 10 y replanteamiento visible, dirigido por Andrews, de etiquetas de compatibilidad de imperativo/admonitivo.",
    },
    11: {
        pdfRefs: ["Andrews Lesson 11.1-11.6"],
        directive: "Usa Andrews Lección 11 para dirigir la taxonomía irregular de cláusula verbal: irregularidad de tronco perfectivo, dislocación entre forma de tiempo y significado, paradigmas defectivos, supleción y límites idiomáticos; mantener las superficies Nawat/Pipil sujetas a evidencia.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/irregulars.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-11-irregular-vnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 11.1-11.6 contra naturaleza irregular de cláusula verbal, irregularidad de tronco perfectivo, dislocación forma de tiempo/significado, supleción y límites idiomáticos.",
                andrewsRefs: ["Andrews Lesson 11.1-11.6"],
                expectedFeedbackRefs: ["src/tests/irregulars.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-11-irregular-vnc-audit",
                result: "hit",
                correction: "La Lección 11 ahora lleva referencias de PDF por subsección, directivas en español, taxonomía irregular de tronco perfectivo, metadatos de dislocación forma de tiempo/significado, marcos de supleción, límites idiomáticos y bloqueos explícitos contra generación irregular clásica-a-Nawat no licenciada.",
                andrewsRefs: ["Andrews Lesson 11.1-11.6"],
                feedbackRefs: ["src/tests/irregulars.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "El subconjunto supletivo Nawat actual está implementado, pero siguen solo diagnósticas o pendientes de evidencia: taxonomía irregular completa de tronco perfectivo de Andrews, dislocaciones forma de tiempo/significado, paradigmas defectivos y modismos.",
    },
    12: {
        pdfRefs: ["Andrews Lesson 12.1-12.7"],
        directive: "Usa Andrews Lección 12 para dirigir la arquitectura absolutiva de cláusula nominal: contraste entre cláusula nominal y cláusula verbal, posición de Estado vacante, posiciones de sujeto pers1-pers2 y núm1-núm2, sin posición de tiempo, comportamiento del tronco nominal predicado, animacidad/referencia y límites estado/tronco nominal.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-12-absolutive-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 12.1-12.7 contra el contraste cláusula nominal/cláusula verbal, posiciones de fórmula de estado absolutivo, posiciones de pronombre sujeto, comportamiento predicativo, animacidad y límites estado/tronco nominal.",
                andrewsRefs: ["Andrews Lesson 12.1-12.7"],
                expectedFeedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-12-absolutive-nnc-audit",
                result: "hit",
                correction: "La Lección 12 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de fórmula absolutiva de cláusula nominal, propiedad del sujeto sobre núm1-núm2, límites predicativos sin tiempo, diagnósticos de animacidad y bloqueos de generación para paradigmas conectores clásicos no licenciados.",
                andrewsRefs: ["Andrews Lesson 12.1-12.7"],
                feedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: posiciones de fórmula de cláusula nominal ordinaria activas, inventario completo de conectores pronominales de sujeto absolutivo de Andrews, comportamiento de tiempo/referencia discursiva, anulaciones metafóricas de animacidad y excepciones de restricción de estado.",
    },
    13: {
        pdfRefs: ["Andrews Lesson 13.1-13.6"],
        directive: "Usa Andrews Lección 13 para dirigir la arquitectura posesiva de cláusula nominal: fórmulas de Estado monádico y diádico, conectores de sujeto de estado posesivo, taxonomía de poseedor monádico ne/te/ta, distribución de categorías de estado uno/estado dos y pronombres específicos de poseedor.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-13-possessive-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 13.1-13.6 contra fórmulas de cláusula nominal de estado posesivo, comportamiento de conectores de sujeto, posiciones de Estado monádico y diádico e inventarios de pronombres de poseedor.",
                andrewsRefs: ["Andrews Lesson 13.1-13.6"],
                expectedFeedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-13-possessive-nnc-audit",
                result: "hit",
                correction: "La Lección 13 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de fórmula de estado posesivo, propiedad del sujeto sobre núm1-núm2, taxonomía de Estado monádico y diádico, marcos de poseedor específico y bloqueos para paradigmas posesivos clásicos-no-licenciados en Nawat.",
                andrewsRefs: ["Andrews Lesson 13.1-13.6"],
                feedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: prefijos actuales de poseedor específico respaldados por evidencia, inventario completo de conectores de sujeto de estado posesivo de Andrews, generación de poseedor monádico ne/te/ta, alomorfía de estado uno/estado dos, advertencias ortográficas y selección de tronco de la Lección 14.",
    },
    14: {
        pdfRefs: ["Andrews Lesson 14.1-14.8"],
        directive: "Usa Andrews Lección 14 para dirigir la arquitectura de clases de tronco nominal: troncos de uso restringido y general, mapeo de clases t/ti/in/cero, número como rasgo solo del sujeto, derivación de troncos de afinidad y distributivos/varietales, selección de tronco por estado y diagnósticos de análisis constituyente.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-14-nounstem-class-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 14.1-14.8 contra clases de tronco de uso, clases de tronco nominal, límites de número, selección de tronco por estado/número y advertencias de análisis constituyente.",
                andrewsRefs: ["Andrews Lesson 14.1-14.8"],
                expectedFeedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-14-nounstem-class-audit",
                result: "hit",
                correction: "La Lección 14 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de tronco de uso y clase de tronco nominal, límites de número/tronco derivado, marcos de selección de tronco por estado y bloqueos para generación no licenciada de clase/subclase.",
                andrewsRefs: ["Andrews Lesson 14.1-14.8"],
                feedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: compatibilidad activa de clase Nawat t/ti/in/cero, pertenencia completa de clase léxica de Andrews, alternancia de tronco de uso restringido/general, derivación de tronco nominal de afinidad/distributivo, alternativas de sujeto plural, subclases posesivas y ambigüedades de análisis constituyente.",
    },
    15: {
        pdfRefs: ["Andrews Lesson 15.1-15.3"],
        directive: "Usa Andrews Lección 15 para dirigir límites adicionales de cláusula nominal: peculiaridades de estado posesivo, casos de estado de posesión natural, poseedor nuclear frente a suplementación y diagnósticos de estructura oracional de cláusula nominal.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-15-further-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 15.1-15.3 contra peculiaridades de estado posesivo, troncos nominales poseídos naturalmente y límites de estructura oracional de cláusula nominal.",
                andrewsRefs: ["Andrews Lesson 15.1-15.3"],
                expectedFeedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-15-further-nnc-audit",
                result: "hit",
                correction: "La Lección 15 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de peculiaridad posesiva, límites de evidencia de posesión natural, diagnósticos de estructura oracional de cláusula nominal y bloqueos para casos de estado u oraciones no licenciados.",
                andrewsRefs: ["Andrews Lesson 15.1-15.3"],
                feedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: asimilación de plural posesivo, troncos posesivos supletivos, troncos secundarios te/ta, casos de estado de posesión natural y estructura oracional de cláusula nominal.",
    },
    16: {
        pdfRefs: ["Andrews Lesson 16.1-16.9"],
        directive: "Usa Andrews Lección 16 para dirigir la arquitectura pronominal de cláusula nominal: cláusulas nominales pronominales solo absolutivas, subtipos entitativo y cuantitativo, inventarios personal/interrogativo/demostrativo/indefinido, troncos de matriz cuantitativa, diagnósticos de ortografía fusionada y bloqueos de generación.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-16-pronominal-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 16.1-16.9 contra clases pronominales de cláusula nominal, subtipos entitativo y cuantitativo, estado solo absolutivo, advertencias de ortografía fusionada y bloqueos de generación.",
                andrewsRefs: ["Andrews Lesson 16.1-16.9"],
                expectedFeedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-16-pronominal-nnc-audit",
                result: "hit",
                correction: "La Lección 16 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de subtipo pronominal de cláusula nominal, límites solo absolutivos, diagnósticos de ortografía fusionada, marcos de matriz cuantitativa y bloqueos para generación pronominal no licenciada.",
                andrewsRefs: ["Andrews Lesson 16.1-16.9"],
                feedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: ejemplos Nawat/Pipil confirmados de cláusula nominal pronominal, contrato seguro de ruta pronominal, manejo de ortografía fusionada, alomorfía de matriz cuantitativa y comportamiento de suplementación/función adjetival.",
    },
    17: {
        pdfRefs: ["Andrews Lesson 17.1-17.6"],
        directive: "Usa Andrews Lección 17 para dirigir la arquitectura de suplementación: grupos de varios núcleos, núcleos de pronombre personal, roles suplementarios de sujeto/objeto/poseedor, contacto de referente compartido, topicalización, diagnósticos de ambigüedad recursiva y transformaciones de pregunta de información.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-17-supplementation-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 17.1-17.6 contra estructura de varios núcleos, roles de suplementación, contacto de referente compartido, topicalización y transformaciones de pregunta de información.",
                andrewsRefs: ["Andrews Lesson 17.1-17.6"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-17-supplementation-audit",
                result: "hit",
                correction: "La Lección 17 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de varios núcleos, marcos de rol de suplementación, diagnósticos de referente compartido, límites de topicalización y bloqueos de transformación interrogativa.",
                andrewsRefs: ["Andrews Lesson 17.1-17.6"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: ejecución de AST de suplementación, ejemplos confirmados de cláusulas Nawat/Pipil, controles de interfaz de tópico/comentario, resolución de ambigüedad recursiva y generación de preguntas de información.",
    },
    18: {
        pdfRefs: ["Andrews Lesson 18.1-18.12"],
        directive: "Usa Andrews Lección 18 para dirigir la segunda parte de la arquitectura de suplementación: movimiento integrado o#, límites de cláusulas nominales pronominales personales cortas, marcación en adjunción, discontinuidad, excepciones de acuerdo, suplementos de pareja nombrada y vínculo masculino, núcleos de objeto silencioso, eliminación de principal, vocativos y orden libre de constituyentes.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-18-supplementation-part-two-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 18.1-18.12 contra suplementos integrados, cláusulas nominales pronominales cortas, suplementación marcada y discontinua, excepciones de acuerdo, suplementos de pareja nombrada/vínculo masculino, núcleos de objeto silencioso, eliminación de principal, vocativos y orden de constituyentes de oración.",
                andrewsRefs: ["Andrews Lesson 18.1-18.12"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-18-supplementation-part-two-audit",
                result: "hit",
                correction: "La Lección 18 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de suplemento integrado, límites pronominales cortos, diagnósticos marcados/discontinuos, excepciones de acuerdo y referente, bloqueos de objeto silencioso, límites vocativos y advertencias anti-traducción de orden oracional.",
                andrewsRefs: ["Andrews Lesson 18.1-18.12"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: AST ejecutables de suplementación, análisis de suplementos marcados y discontinuos, resolución de núcleo de objeto silencioso, comportamiento de superficie/prosodia vocativa, interpretación de orden libre de constituyentes y evidencia confirmada de cláusula Nawat/Pipil.",
    },
    19: {
        pdfRefs: ["Andrews Lesson 19.1-19.6"],
        directive: "Usa Andrews Lección 19 para dirigir la tercera parte de la arquitectura de suplementación: cláusulas verbales como suplementos, suplementación pronominal plural, suplementación de referente incluido, condiciones de traducción infinitiva, reporte de rumor y principales de decir eliminados.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-19-supplementation-part-three-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 19.1-19.6 contra suplementos de cláusula verbal, suplementación pronominal plural, arquitectura de referente incluido, condiciones de traducción infinitiva, reporte de rumor y principales de decir eliminados.",
                andrewsRefs: ["Andrews Lesson 19.1-19.6"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-19-supplementation-part-three-audit",
                result: "hit",
                correction: "La Lección 19 ahora lleva referencias de PDF por subsección, directivas en español, roles de suplemento de cláusula verbal, metadatos de suplementación pronominal plural, marcos de referente incluido, grupos semánticos de habla/complemento, bloqueos de reporte de rumor y diagnósticos de decir eliminado.",
                andrewsRefs: ["Andrews Lesson 19.1-19.6"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: AST ejecutables de suplemento de cláusula verbal y referente incluido, contratos de ruta pronominal plural, análisis de habla directa/indirecta, manejo de reporte de rumor, recuperación de principal de decir eliminado y evidencia confirmada de cláusula Nawat/Pipil.",
    },
    20: {
        pdfRefs: ["Andrews Lesson 20.1-20.8"],
        directive: "Usa Andrews Lección 20 para dirigir la derivación de tronco verbal no activo: selección de fuente activa imperfectiva, familias de sufijos u/lu/wa y combinaciones, realización Nawat u/lu/wa/uwa/luwa/walu, límites de excepción y rutas de Clase A-2.",
        implementationState: "implemented-audited",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-20-nonactive-verbstem-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 20.1-20.8 contra las familias actuales de sufijos no activos Nawat, selección de fuente activa imperfectiva, correspondencias de sufijo, límites de excepción y rutas de Clase A-2.",
                andrewsRefs: ["Andrews Lesson 20.1-20.8"],
                expectedFeedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-20-nonactive-verbstem-audit",
                result: "hit",
                correction: "La Lección 20 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de puente para familias de sufijos Nawat, límites de tronco fuente, familias actuales de opción del motor y evidencia de rutas de Clase A-2.",
                andrewsRefs: ["Andrews Lesson 20.1-20.8"],
                feedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "none",
    },
    21: {
        pdfRefs: ["Andrews Lesson 21.1-21.4"],
        directive: "Usa Andrews Lección 21 para dirigir la arquitectura de voz pasiva de cláusula verbal: fuente activa con objeto específico, eliminación del sujeto activo, reemplazo por tronco no activo, reasignación de objeto a sujeto, sin agente pasivo expresado, reglas de caso de generación pasiva, límites de modo oracional pasivo y diagnósticos de noción pasiva activa-reflexiva.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-21-passive-voice-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 21.1-21.4 contra la ruta actual no activa/pasiva, mapeo de objeto a sujeto, casos de generación pasiva, límites de modo oracional y noción pasiva activa-reflexiva.",
                andrewsRefs: ["Andrews Lesson 21.1-21.4"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-21-passive-voice-audit",
                result: "hit",
                correction: "La Lección 21 ahora registra la transformación pasiva de Andrews, el inventario de casos 21.2, soporte actual de anulación de sujeto pasivo Nawat, deriva combinada pasiva/impersonal y brechas explícitas antes de reclamar pase más cercano.",
                andrewsRefs: ["Andrews Lesson 21.1-21.4"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: rutas visibles y generadas combinadas pasiva/impersonal, compuertas pasivas de ta/te no específico, rutas de caso pasivo reflexivo y de varios objetos, comportamiento oracional pasivo optativo/admonitivo y diagnósticos de noción pasiva activa-reflexiva.",
    },
    22: {
        pdfRefs: ["Andrews Lesson 22.1-22.6"],
        directive: "Usa Andrews Lección 22 para dirigir la arquitectura impersonal de cláusula verbal: sujetos impersonales inherentes, distinción entre no animado e impersonal, transformación de voz impersonal, generación con la misma fórmula, preservación de objeto no específico, testigo reflexivo ne, límites de modo oracional y troncos derivacionales ta-impersonales.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-22-impersonal-voice-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 22.1-22.6 contra las rutas actuales de voz pasiva/impersonal, comportamiento de sujeto impersonal, distinción no animada, restricciones de fuente, objetos no específicos preservados, testigo reflexivo ne, modos oracionales y derivación ta-impersonal.",
                andrewsRefs: ["Andrews Lesson 22.1-22.6"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-22-impersonal-voice-audit",
                result: "hit",
                correction: "La Lección 22 ahora registra el contrato de sujeto impersonal de Andrews, distinción no animada, transformación impersonal, reglas de generación 22.4, límite de modo oracional, límite de derivación ta-impersonal, soporte actual del motor y brechas explícitas antes de reclamar pase más cercano.",
                andrewsRefs: ["Andrews Lesson 22.1-22.6"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: rutas visibles y generadas combinadas pasiva/impersonal, inventario léxico impersonal inherente, interpretación no animada frente a impersonal, compuertas de objeto fuente, preservación te/ta no específica, comportamiento del testigo reflexivo ne, modos oracionales e inventario derivacional ta-impersonal.",
    },
    23: {
        pdfRefs: ["Andrews Lesson 23.1-23.5"],
        directive: "Usa Andrews Lección 23 para dirigir la arquitectura de objetos verbales: clases de objeto directivo, causativo y aplicativo; posiciones múltiples de valencia; niveles de objeto de línea principal y línea desviada; morfemas silenciosos; prioridades de secuencia de objeto; y adaptación ortográfica Nawat para marcadores de objeto.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/agreement.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-23-verb-objects-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 23.1-23.5 contra las posiciones actuales de objeto, metadatos de función de objeto, posiciones de línea principal/línea desviada, morfemas silenciosos, prioridades de secuencia y puente ortográfico Nawat.",
                andrewsRefs: ["Andrews Lesson 23.1-23.5"],
                expectedFeedbackRefs: ["src/tests/agreement.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-23-verb-objects-audit",
                result: "hit",
                correction: "La Lección 23 ahora registra clases de objeto de Andrews, posiciones múltiples de valencia, límites de fórmula +va, reglas de línea principal/línea desviada, prioridades de secuencia de objeto, soporte actual de posiciones de objeto y brechas explícitas antes de reclamar pase más cercano.",
                andrewsRefs: ["Andrews Lesson 23.1-23.5"],
                feedbackRefs: ["src/tests/agreement.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: ambigüedad de función de objeto, contratos discontinuos de objeto-más-sufijo, historias completas de línea principal/línea desviada, tablas de morfemas silenciosos, las trece combinaciones de objeto de Andrews, inventario del Apéndice C y excepciones Nawat/Pipil.",
    },
    24: {
        pdfRefs: ["Andrews Lesson 24.1-24.9"],
        directive: "Usa Andrews Lección 24 para dirigir la arquitectura causativa de primer tipo: límites de valencia por vocal final, troncos neutrales de valencia, reemplazo/adición de a causativa, formantes de acervo y tronco desacervales, transformación de sujeto fuente a objeto y control de la a causativa sobre el núcleo fuente.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-24-first-type-causative-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 24.1-24.9 contra la generación causativa actual de primer tipo, límites neutrales de valencia, arquitectura de tronco desacerval, transformaciones de sujeto fuente a objeto y evidencia ortográfica Nawat.",
                andrewsRefs: ["Andrews Lesson 24.1-24.9"],
                expectedFeedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-24-first-type-causative-audit",
                result: "hit",
                correction: "La Lección 24 ahora registra límites de vocal final de Andrews, troncos neutrales de valencia, procedimientos de a causativa de primer tipo, arquitectura de acervo desacerval, transformación generativa 24.8, soporte actual del motor y brechas explícitas antes de reclamar pase más cercano.",
                andrewsRefs: ["Andrews Lesson 24.1-24.9"],
                feedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: léxico de valencia por vocal final, compuertas de tronco neutral de valencia, selección de reemplazo/adición de primer tipo, inventarios desacervales y pertenencia de clase, transformación de sujeto fuente de cláusula verbal a objeto y análisis compuesto/matriz de a causativa.",
    },
    25: {
        pdfRefs: ["Andrews Lesson 25.1-25.16"],
        directive: "Usa Andrews Lección 25 para dirigir la arquitectura causativa de segundo tipo: familias fuente tia, lia y wia; pertenencia a Clase C; compactación de cláusula verbal fuente; transformaciones causativas de uno, dos y tres objetos; ambigüedad; causativos pasivos/impersonales; modos oracionales; y suplementación de objetos silenciosos.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-25-second-type-causative-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 25.1-25.16 contra la generación causativa actual de segundo tipo, selección de familia fuente, transformaciones de uno/dos/tres objetos, ambigüedad, voces, modos oracionales y suplementación de objeto silencioso.",
                andrewsRefs: ["Andrews Lesson 25.1-25.16"],
                expectedFeedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-25-second-type-causative-audit",
                result: "hit",
                correction: "La Lección 25 ahora registra familias fuente causativas de segundo tipo de Andrews, límites tia/lia/wia, política de Clase C, reglas de transformación de cláusula verbal fuente, comportamiento de profundidad de objeto, ambigüedad, límites de voz y oración, soporte actual del motor y brechas explícitas antes de reclamar pase más cercano.",
                andrewsRefs: ["Andrews Lesson 25.1-25.16"],
                feedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: inventarios de familias fuente de segundo tipo, fuentes no activas inesperadas, casos supletivos y solo honoríficos, transformaciones de cláusula verbal fuente de uno/dos/tres objetos, objetos silenciosos de línea desviada, ambigüedad causativa, causativos pasivos/impersonales, modos oracionales y suplementación de objeto silencioso.",
    },
    26: {
        pdfRefs: ["Andrews Lesson 26.1-26.23"],
        directive: "Usa Andrews Lección 26 para dirigir la arquitectura aplicativa: roles de objeto aplicativo; familias fuente ia, lia, wia y tia rara; pertenencia a Clase C; transformaciones de cláusula verbal fuente; cláusulas verbales aplicativas de uno, dos y tres objetos; ambigüedad; aplicativos pasivos/impersonales; modos oracionales; interpretación alternativa de objeto; cláusulas verbales engañosas; y la unidad discontinua objeto-más-sufijo.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-26-applicative-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 26.1-26.23 contra la generación aplicativa actual, selección de forma fuente, transformaciones de uno/dos/tres objetos, ambigüedad, voces, modos oracionales y control de unidad objeto-más-sufijo.",
                andrewsRefs: ["Andrews Lesson 26.1-26.23"],
                expectedFeedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-26-applicative-audit",
                result: "hit",
                correction: "La Lección 26 ahora registra familias fuente aplicativas de Andrews, límites ia/lia/wia/tia, política de Clase C, reglas de transformación de cláusula verbal fuente, comportamiento de profundidad de objeto, ambigüedad, límites de voz y oración, soporte actual del motor y brechas explícitas antes de reclamar pase más cercano.",
                andrewsRefs: ["Andrews Lesson 26.1-26.23"],
                feedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: inventarios fuente aplicativos ia/lia/wia/tia, troncos irregulares y neutrales de valencia, excepciones de forma fuente, troncos paralelos de primer/segundo tipo, transformaciones de cláusula verbal fuente de uno/dos/tres objetos, objetos silenciosos de línea desviada, cobertura del Apéndice C, ambigüedad aplicativa, aplicativos pasivos/impersonales, modos oracionales, interpretación alternativa de objeto, cláusulas verbales engañosas y análisis de unidad objeto-más-sufijo.",
    },
    27: {
        pdfRefs: ["Andrews Lesson 27.1-27.6"],
        directive: "Usa Andrews Lección 27 para dirigir la arquitectura frecuentativa: formas ordinarias de prefijo reduplicativo, reduplicación de pronombre objeto, frecuentativos desacervales, formaciones frecuentativas inciertas, frecuentativos no activos y separación estricta de ayudantes genéricos de reduplicación hasta que evidencia Nawat/Pipil autorice salida.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/frequentative.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-27-frequentative-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 27.1-27.6 contra los metadatos actuales de límite frecuentativo, ayudantes genéricos de reduplicación, reduplicación de pronombre objeto, frecuentativos desacervales, formaciones inciertas y frecuentativos no activos.",
                andrewsRefs: ["Andrews Lesson 27.1-27.6"],
                expectedFeedbackRefs: ["src/tests/frequentative.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-27-frequentative-audit",
                result: "hit",
                correction: "La Lección 27 ahora registra categorías frecuentativas ordinarias, de pronombre objeto, desacervales, inciertas y no activas de Andrews, manteniendo la generación bloqueada y los ayudantes genéricos actuales de reduplicación marcados como no evidencia.",
                andrewsRefs: ["Andrews Lesson 27.1-27.6"],
                feedbackRefs: ["src/tests/frequentative.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: ejemplos frecuentativos Nawat/Pipil confirmados, selección ordinaria de forma de prefijo, reduplicación de pronombre objeto, generación frecuentativa desacerval, derivación frecuentativa incierta, generación frecuentativa no activa, ambigüedad causativa/aplicativa y validación contra falsos positivos de reduplicación genérica.",
    },
    28: {
        pdfRefs: ["Andrews Lesson 28.1-28.12"],
        directive: "Usa Andrews Lección 28 para dirigir la arquitectura de troncos verbales compuestos con incrustación verbal: fórmulas de composición, orden matriz-después-de-incrustación, cohesión enlazada frente a integrada, morfología conectiva -t, inventarios limitados de matriz, formaciones especiales pasivas/impersonales, posesión acompañante, compuestos con matriz reflexiva, compuestos con objeto compartido, compuestos con incrustación futura y recursión.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-28-verbal-embed-compound-audit",
                type: "metadata-parser-test",
                aim: "Auditar Andrews Lección 28.1-28.12 contra los metadatos actuales de análisis de compuestos, orden matriz/incrustación, límites enlazados/integrados, patrones conectivos -t, matrices intransitivas/reflexivas/de objeto compartido, comportamiento de incrustación futura y recursión.",
                andrewsRefs: ["Andrews Lesson 28.1-28.12"],
                expectedFeedbackRefs: ["src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-28-verbal-embed-compound-audit",
                result: "hit",
                correction: "La Lección 28 ahora registra las fórmulas compuestas de Andrews, arquitectura de matriz/incrustación, cohesión, requisitos conectivos -t, marcos intransitivos/reflexivos/de objeto compartido/de incrustación futura, formaciones especiales, posesión acompañante y recursión, dejando bloqueada la generación ampliada.",
                andrewsRefs: ["Andrews Lesson 28.1-28.12"],
                feedbackRefs: ["src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: metadatos actuales de análisis de compuestos y marcos de compuesto sin generación de incrustación de pretérito con conectivo -t, inventarios limitados de matrices intransitivas, formaciones especiales ye/yaj/kak/itz, rutas de compuesto pasivo/impersonal, suplementación de posesión acompañante, compuestos de matriz reflexiva intransitivizada, compuestos de objeto compartido, compuestos de incrustación futura, recursión y ejemplos Nawat/Pipil confirmados.",
    },
    29: {
        pdfRefs: ["Andrews Lesson 29.1-29.7"],
        directive: "Usa Andrews Lección 29 para dirigir la arquitectura de cláusulas verbales purposivas: compuestos enlazados sin conectivo con incrustación futura, morfemas direccionales internos de salida t y entrada k, morfemas silenciosos de incrustación futura, paradigmas de tiempo/modo salientes y entrantes, incrustaciones no activas pasivas e impersonales, incrustaciones con tronco compuesto y alternativas direccionales externas wal/on.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/purposive.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-29-purposive-vnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 29.1-29.7 contra los metadatos actuales de límite purposivo/direccional, morfemas direccionales internos del tronco, paradigmas salientes/entrantes, incrustaciones pasivas/impersonales, incrustaciones con tronco compuesto y alternativas direccionales externas wal/on.",
                andrewsRefs: ["Andrews Lesson 29.1-29.7"],
                expectedFeedbackRefs: ["src/tests/purposive.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-29-purposive-vnc-audit",
                result: "hit",
                correction: "La Lección 29 ahora registra la arquitectura de troncos verbales purposivos de Andrews, paradigmas salientes y entrantes, incrustaciones no activas y con tronco compuesto, alternativas direccionales externas y separación frente a prefijos direccionales ordinarios, compuestos progresivos con conectivo -t y terminaciones admonitivas, manteniendo la generación bloqueada.",
                andrewsRefs: ["Andrews Lesson 29.1-29.7"],
                feedbackRefs: ["src/tests/purposive.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: ejemplos Nawat/Pipil purposivos confirmados, generación finita saliente/entrante, comportamiento de morfema futuro silencioso, distinciones de longitud vocálica y saltillo, comportamiento opcional o#, plural irregular n, desambiguación purposiva/progresiva/admonitiva, incrustaciones no activas pasivas/impersonales, incrustaciones con tronco compuesto, alternativas direccionales externas wal/on, lecturas de propósito cumplido y movimiento metafórico.",
    },
    30: {
        pdfRefs: ["Andrews Lesson 30.1-30.18"],
        directive: "Usa Andrews Lección 30 para dirigir troncos verbales compuestos con incrustación nominal: arquitectura integrada de cláusula nominal + cláusula verbal, selección de tronco nominal de uso general, reducción de valencia por objeto incorporado, roles adverbiales incorporados, transformaciones de suplemento a adverbial, complementos incorporados, reduplicación, rutas no activas y advertencias de que la incrustación no es agente ni sujeto.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-30-nominal-embed-compound-audit",
                type: "metadata-parser-test",
                aim: "Auditar Andrews Lección 30.1-30.18 contra los metadatos actuales de incrustación léxica del análisis de compuestos, clasificaciones fijas de cláusula nominal, categorías de objeto/adverbial/complemento incorporado, transformaciones de suplemento, reduplicación, rutas no activas y advertencias contra traducción directa.",
                andrewsRefs: ["Andrews Lesson 30.1-30.18"],
                expectedFeedbackRefs: ["src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-30-nominal-embed-compound-audit",
                result: "hit",
                correction: "La Lección 30 ahora registra la arquitectura integrada de cláusula nominal + cláusula verbal de Andrews, reducción de valencia por objeto incorporado, roles adverbiales incorporados y transformaciones de suplemento, comportamiento de complemento incorporado, reduplicación, rutas de voz no activa y advertencias de que la incrustación no es agente ni sujeto, dejando bloqueada la generación ampliada.",
                andrewsRefs: ["Andrews Lesson 30.1-30.18"],
                feedbackRefs: ["src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: selección de tronco nominal de uso general, excepciones de subclase, reducción de valencia por objeto incorporado, análisis excepcional de fusión ta, transformaciones de suplemento a adverbial, complementos incorporados, reduplicación de incrustación y matriz, rutas pasivas/impersonales, incrustaciones únicas, modismos y ejemplos Nawat/Pipil confirmados.",
    },
    31: {
        pdfRefs: ["Andrews Lesson 31.1-31.13"],
        directive: "Usa Andrews Lección 31 para dirigir la arquitectura de troncos nominales compuestos: control de fórmula cláusula nominal + cláusula nominal = cláusula nominal, estructuras enlazadas e integradas, orden incrustación-antes-de-matriz, clase de tronco nominal gobernada por matriz, roles semánticos de incrustación, orientación de poseedor, importancia de matriz, comportamiento de clase de incrustación, rellenadores únicos, compuestos conjuntivos, rellenadores recursivos, formaciones de sexo/progenie/compañerismo, troncos de afinidad y troncos distributivos/varietales.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-31-compound-nounstem-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 31.1-31.13 contra los metadatos actuales de límite compuesto/afectivo de cláusula nominal, control de fórmula cláusula nominal + cláusula nominal, orden matriz/incrustación, orientación de poseedor, rellenadores únicos, compuestos conjuntivos y recursivos, formaciones de sexo/progenie/compañerismo, troncos de afinidad y troncos distributivos/varietales.",
                andrewsRefs: ["Andrews Lesson 31.1-31.13"],
                expectedFeedbackRefs: ["src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-31-compound-nounstem-audit",
                result: "hit",
                correction: "La Lección 31 ahora registra la arquitectura de troncos nominales compuestos de Andrews, gobierno de matriz/incrustación, orientación de poseedor, comportamiento de clase de incrustación, rellenadores únicos, estructuras conjuntivas y recursivas, formaciones semánticas especiales, troncos de afinidad y troncos distributivos/varietales, manteniendo la generación bloqueada.",
                andrewsRefs: ["Andrews Lesson 31.1-31.13"],
                feedbackRefs: ["src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación de troncos nominales compuestos, análisis compuesto específico de cláusula nominal, segmentación enlazada/sin conectivo/integrada, orientación de poseedor, alomorfía de clase de incrustación, rellenadores únicos, clases de matriz ka/yu, compuestos conjuntivos, compuestos recursivos, patrones de sexo/progenie/compañerismo, troncos de afinidad, troncos distributivos/varietales y ejemplos Nawat/Pipil confirmados.",
    },
    32: {
        pdfRefs: ["Andrews Lesson 32.1-32.8"],
        directive: "Usa Andrews Lección 32 para dirigir la arquitectura afectiva de cláusulas nominales: actitud valorativa/despectiva en troncos nominales compuestos afectivos o cláusulas nominales de sujeto defectuoso, comportamiento de clase de tronco nominal con matriz afectiva para pil, pol, tzin, ton y zol, troncos afectivos con forma de afinidad, ambigüedad pil niño/noble, comportamiento de número afectivo no animado y silenciamiento de número uno en sujeto defectuoso.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-32-affective-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 32.1-32.8 contra los metadatos actuales de límite compuesto/afectivo de cláusula nominal, clases de tronco nominal con matriz afectiva, afectivos con forma de afinidad, ambigüedad pil niño/noble, comportamiento de número afectivo no animado y cláusulas nominales de sujeto defectuoso.",
                andrewsRefs: ["Andrews Lesson 32.1-32.8"],
                expectedFeedbackRefs: ["src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-32-affective-nnc-audit",
                result: "hit",
                correction: "La Lección 32 ahora registra la arquitectura afectiva de cláusulas nominales de Andrews, comportamiento de clase con matriz afectiva, troncos afectivos con forma de afinidad, ambigüedad pil niño/noble, comportamiento de número no animado y cláusulas nominales de sujeto defectuoso, manteniendo la generación bloqueada.",
                andrewsRefs: ["Andrews Lesson 32.1-32.8"],
                feedbackRefs: ["src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación afectiva de cláusula nominal, rutas de clase con matriz afectiva para pil/pol/tzin/ton/zol, cambios lexicalizados de clase, variantes vocativas, afectivos con forma de afinidad, ambigüedad pil niño/noble, comportamiento de concordancia de número no animado, silenciamiento de número uno en sujeto defectuoso, inventarios de troncos defectivos y ejemplos afectivos Nawat/Pipil confirmados.",
    },
    33: {
        pdfRefs: ["Andrews Lesson 33.1-33.10"],
        directive: "Usa Andrews Lección 33 para dirigir la arquitectura honorífica y peyorativa de cláusulas verbales: transformaciones reflexivas honoríficas causativas/aplicativas, ambigüedad de objeto proyectivo, cláusulas verbales fuente causativas/aplicativas, compuestos de línea principal con incrustación de pretérito de fuente reflexiva con tzin-u-a, duplicación reverencial, compuestos peyorativos con incrustación de pretérito con pul-u-a y blanco de transformación honorífica/peyorativa en tronco verbal compuesto.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/honorific_pejorative.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-33-honorific-pejorative-vnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 33.1-33.10 contra los metadatos actuales de límite honorífico/peyorativo, rutas reflexivas causativas/aplicativas, ambigüedad de objeto proyectivo, incrustaciones de pretérito con fuente reflexiva, duplicación reverencial, compuestos peyorativos pul-u-a y transformaciones de tronco verbal compuesto.",
                andrewsRefs: ["Andrews Lesson 33.1-33.10"],
                expectedFeedbackRefs: ["src/tests/honorific_pejorative.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-33-honorific-pejorative-vnc-audit",
                result: "hit",
                correction: "La Lección 33 ahora registra la arquitectura honorífica y peyorativa de cláusulas verbales de Andrews, rutas honoríficas reflexivas causativas/aplicativas, ambigüedad de objeto proyectivo, incrustaciones de pretérito con fuente reflexiva, duplicación reverencial, compuestos peyorativos pul-u-a y límites de transformación de tronco verbal compuesto, manteniendo la generación bloqueada.",
                andrewsRefs: ["Andrews Lesson 33.1-33.10"],
                feedbackRefs: ["src/tests/honorific_pejorative.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación honorífica, generación peyorativa, generación reverencial, selección de ruta reflexiva causativa/aplicativa, ambigüedad de entidad honrada como objeto proyectivo, rutas de incrustación de pretérito tzin-u-a, rutas de incrustación de pretérito pul-u-a, blanco de transformación de tronco verbal compuesto y ejemplos honoríficos o peyorativos Nawat/Pipil confirmados.",
    },
    34: {
        pdfRefs: ["Andrews Lesson 34.1-34.16"],
        directive: "Usa Andrews Lección 34 para dirigir arquitectura de cláusulas nominales de numerales cardinales: órdenes vigesimales, fórmula cardinal de estado absolutivo, conteos ordinarios frente a conteos gruesos, troncos numerales básicos, matrices compuestas de orden alto, cláusulas numerales conjuntadas, conjuntos clasificadores, reduplicación, modificadores aproximativos/de más y cláusulas nominales de medida.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_numerals.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-34-cardinal-numeral-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 34.1-34.16 contra los metadatos actuales de límite de numerales en cláusula nominal, orden vigesimal, fórmula cardinal de estado absolutivo, conteos simples/gruesos, conjuntos básicos y clasificadores, numerales conjuntados, reduplicación, aproximación y medidas.",
                andrewsRefs: ["Andrews Lesson 34.1-34.16"],
                expectedFeedbackRefs: ["src/tests/nnc_numerals.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-34-cardinal-numeral-nnc-audit",
                result: "hit",
                correction: "La Lección 34 ahora registra la arquitectura de cláusulas nominales de numerales cardinales de Andrews, órdenes vigesimales, límite de fórmula de estado absolutivo, conteos simples y gruesos, troncos básicos, compuestos de orden alto, numerales conjuntados, conjuntos clasificadores, reduplicación, aproximación y medidas, manteniendo la generación bloqueada.",
                andrewsRefs: ["Andrews Lesson 34.1-34.16"],
                feedbackRefs: ["src/tests/nnc_numerals.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación de numerales cardinales, troncos numerales básicos, rutas de conteo grueso, formaciones excepcionales de conteo grueso en estado posesivo, matrices compuestas de orden alto, estructuras numerales conjuntadas, conjuntos clasificadores, reduplicación, modificadores aproximativos/de más, cláusulas nominales de medida y ejemplos Nawat/Pipil confirmados.",
    },
    35: {
        pdfRefs: ["Andrews Lesson 35.1-35.12"],
        directive: "Usa Andrews Lección 35 para dirigir la arquitectura de nominalización agentiva de pretérito: conversión estructural de cláusula nuclear verbal a cláusula nuclear nominal, troncos agentivos de pretérito de uso restringido y general, estados absolutivo y posesivo, alternancias de posición de número, incrustaciones compuestas, formaciones de anciana/anciano, matrices de posesión y posesión abundante, límites de traducción y roles de objeto/adverbial incrustados desde cláusula verbal.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-35-preterit-agentive-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 35.1-35.12 contra los metadatos actuales de límite de nominalización, troncos agentivos de pretérito de uso restringido/general, estado posesivo, incrustaciones compuestas, formaciones de persona anciana, posesión, posesión abundante y continuaciones de incrustación/adverbial desde cláusula verbal.",
                andrewsRefs: ["Andrews Lesson 35.1-35.12"],
                expectedFeedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-35-preterit-agentive-audit",
                result: "hit",
                correction: "La Lección 35 ahora registra la arquitectura de nominalización agentiva de pretérito de Andrews, troncos de uso restringido y general, alternancias de posición de número, comportamiento de estado posesivo, incrustaciones compuestas, formaciones de persona anciana, matrices de posesión y posesión abundante, límites de traducción y roles de incrustación/adverbial desde cláusula verbal, preservando las compuertas de evidencia.",
                andrewsRefs: ["Andrews Lesson 35.1-35.12"],
                feedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación agentiva de pretérito completa, alternancias de posición de número, selección de tronco de afinidad, híbridos activados de objeto proyectivo, límites léxicos de persona anciana, absolutivos raros con matriz que, selección completa de subclases de posesión e/wa/yua, matrices adverbiales centradas en objeto, excepciones reflexivas lexicalizadas y ejemplos Nawat/Pipil confirmados.",
    },
    36: {
        pdfRefs: ["Andrews Lesson 36.1-36.12"],
        directive: "Usa Andrews Lección 36 para dirigir la arquitectura de cláusulas verbales nominalizadas más allá de la Lección 35: reanálisis agentivo de presente habitual y nominalización plena, patientivos de presente habitual, instrumentivos, cláusulas nominales agentivas de presente y futuro, cláusulas nominales de acción pasiva y activa, troncos de acción de uso restringido/general y contrastes entre acción activa y agentivo de pretérito.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-36-nominalized-vnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 36.1-36.12 contra los metadatos actuales de límite de nominalización, reanálisis/nominalización plena agentiva de presente habitual, patientivos de presente habitual, instrumentivos, agentivos de presente/futuro, cláusulas nominales de acción, acción pasiva, acción activa y contrastes entre acción activa y agentivo de pretérito.",
                andrewsRefs: ["Andrews Lesson 36.1-36.12"],
                expectedFeedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-36-nominalized-vnc-audit",
                result: "hit",
                correction: "La Lección 36 ahora registra la arquitectura de cláusulas verbales nominalizadas de Andrews para reanálisis y nominalización plena agentiva de presente habitual, patientivos de presente habitual, instrumentivos, agentivos de presente y futuro, cláusulas nominales de acción, fuentes de acción pasiva y activa y límites contrastivos, preservando las compuertas de evidencia actuales.",
                andrewsRefs: ["Andrews Lesson 36.1-36.12"],
                feedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: paradigmas agentivos completos de presente habitual, enrutamiento de reanálisis frente a nominalización plena, reanálisis posesivo raro, híbridos de objeto activado, variantes pasivas patientivas de presente habitual, excepciones de fuente de estado instrumentivo, incrustaciones lexicalizadas de agentivo futuro, alternancias de acción pasiva y activa de uso restringido/general, sentidos de acción lexicalizados y ejemplos Nawat/Pipil confirmados.",
    },
    37: {
        pdfRefs: ["Andrews Lesson 37.1-37.9"],
        directive: "Usa Andrews Lección 37 para dirigir la arquitectura de troncos nominales deverbales: derivación desde núcleo verbal frente a reanálisis de nominalización, acción activa z/liz, valores de traducción de liz, valores de paciente potencial, nombres de acción impersonal, incrustaciones compuestas, contraste acción activa/pasiva, usos de suplemento de varios núcleos, familias de fuente patientiva y compuertas de fuente patientiva pasiva.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-37-deverbal-nounstem-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 37.1-37.9 contra los metadatos actuales de límite de nominalización, generación de acción activa z/liz, límites de traducción, valores de paciente potencial y acción impersonal, contrastes de acción activa/pasiva, suplementos de varios núcleos, familias de fuente patientiva y compuertas de fuente patientiva pasiva.",
                andrewsRefs: ["Andrews Lesson 37.1-37.9"],
                expectedFeedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-37-deverbal-nounstem-audit",
                result: "hit",
                correction: "La Lección 37 ahora registra la arquitectura de troncos nominales deverbales de Andrews, acción activa z/liz, valores de traducción de liz, particularidades de paciente potencial y acción impersonal, contraste de rol de poseedor en acción activa/pasiva, uso de suplemento de varios núcleos, familias de fuente patientiva y compuertas de fuente patientiva pasiva, preservando los límites actuales de evidencia.",
                andrewsRefs: ["Andrews Lesson 37.1-37.9"],
                feedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación completa de acción activa z/liz, enrutamiento de paciente potencial, enrutamiento de acción impersonal, incrustaciones compuestas, sintaxis de suplemento de varios núcleos, compuertas de fuente patientiva pasiva, eliminación de sufijo no activo, advertencias de fuente pasiva irregular, asimilación tzin y ejemplos Nawat/Pipil confirmados.",
    },
    38: {
        pdfRefs: ["Andrews Lesson 38.1-38.2"],
        directive: "Usa Andrews Lección 38 para dirigir la arquitectura de tronco nominal patientivo impersonal: fuente de núcleo verbal impersonal, familias de fuente intransitiva, ne reflexivo de línea desviada, tla proyectivo no humano, enrutamiento pasivo impersonalizado humano te-a-tla, contraste humano/no humano, traslape de traducción con nombres de acción activa y límites de patientivo compuesto.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-38-impersonal-patientive-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 38.1-38.2 contra los metadatos actuales de familias patientivas, enrutamiento de núcleo fuente patientivo impersonal, familias de fuente intransitiva, ne reflexivo de línea desviada, tla proyectivo no humano, enrutamiento pasivo impersonalizado humano te-a-tla, contraste humano/no humano, traslape de traducción y límites de tronco nominal patientivo compuesto.",
                andrewsRefs: ["Andrews Lesson 38.1-38.2"],
                expectedFeedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-38-impersonal-patientive-audit",
                result: "hit",
                correction: "La Lección 38 ahora registra la arquitectura patientiva impersonal de Andrews, familias de fuente intransitiva, comportamiento reflexivo de línea desviada, enrutamiento proyectivo no humano, enrutamiento pasivo impersonalizado humano te-a-tla, contraste humano/no humano, traslape de traducción con nombres de acción activa y límites de patientivo compuesto, preservando las compuertas de evidencia.",
                andrewsRefs: ["Andrews Lesson 38.1-38.2"],
                feedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación patientiva impersonal completa, selección de fuente intransitiva raíz-más-ya, detalles de fuente lo/o/o-hua/hua/hua-lo, acortamiento vocálico, reemplazo de a final, contraste humano/no humano, patientivos te anómalos, desambiguación de homónimos, comportamiento de fuente y matriz de patientivo compuesto y ejemplos Nawat/Pipil confirmados.",
    },
    39: {
        pdfRefs: ["Andrews Lesson 39.1-39.9"],
        directive: "Usa Andrews Lección 39 para dirigir operaciones patientivas más allá de fuentes pasivas e impersonales: patientivos perfectivos e imperfectivos, patientivos de propiedad característica con matriz yo, patientivos de raíz/acervo, derivación patientiva múltiple, troncos nominales patientivos como incrustaciones compuestas, complementos incorporados, objetos incorporados e incrustaciones de propiedad característica.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-39-patientive-operations-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 39.1-39.9 contra los metadatos actuales de familias patientivas, compuertas de fuente patientiva perfectiva e imperfectiva, comportamiento de matriz yo de propiedad característica, contratos patientivos de raíz/acervo, metadatos de derivación múltiple, incrustaciones compuestas, complementos incorporados, objetos incorporados y continuaciones de incrustación de propiedad característica.",
                andrewsRefs: ["Andrews Lesson 39.1-39.9"],
                expectedFeedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-39-patientive-operations-audit",
                result: "hit",
                correction: "La Lección 39 ahora registra operaciones patientivas de Andrews para comportamiento perfectivo, imperfectivo, de propiedad característica, raíz/acervo, derivación múltiple, incrustación compuesta, complemento incorporado, objeto incorporado e incrustación de propiedad característica, preservando las compuertas de evidencia actuales.",
                andrewsRefs: ["Andrews Lesson 39.1-39.9"],
                feedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación patientiva perfectiva completa, generación patientiva imperfectiva, enrutamiento de matriz yo de propiedad característica, contrastes de posesión orgánica, elección de variante raíz/acervo, selección de salida de derivación múltiple, matrices de incrustación compuesta, matrices de complemento incorporado, matrices de objeto incorporado, omisión de incrustación de propiedad característica, manejo de violación de valencia, restricciones idiomáticas y ejemplos Nawat/Pipil confirmados.",
    },
    40: {
        pdfRefs: ["Andrews Lesson 40.1-40.12"],
        directive: "Usa Andrews Lección 40 para dirigir la arquitectura de función adjetival nominal: adjetivo como función sintáctica, cláusulas nominales adjetivales excepcionales, traducción predicativa nominal/verbal, troncos nominales derivados, predicados verbales nominalizados, predicados agentivos habituales y patientivos, comportamiento de clase agentiva de pretérito, pretérito obsoleto raíz-más-ya, pares y tríos sinónimos y oraciones predicado-adjetivo.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-40-adjectival-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 40.1-40.12 contra los metadatos actuales de función adjetival nominal, cláusulas nominales adjetivales excepcionales, traducción predicativa nominal/verbal, adjetivos de tronco nominal derivado, rutas adjetivales de cláusula verbal nominalizada, clases agentivas de pretérito, pretérito obsoleto raíz-más-ya, conjuntos sinónimos y límites de oración predicado-adjetivo.",
                andrewsRefs: ["Andrews Lesson 40.1-40.12"],
                expectedFeedbackRefs: ["src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-40-adjectival-nnc-audit",
                result: "hit",
                correction: "La Lección 40 ahora registra la arquitectura de función adjetival nominal de Andrews en límites ordinarios, excepcionales, nominales/verbales, de tronco nominal derivado, de cláusula verbal nominalizada, agentivos de pretérito, pretérito obsoleto, conjuntos sinónimos y oraciones predicado-adjetivo, preservando las compuertas de evidencia actuales.",
                andrewsRefs: ["Andrews Lesson 40.1-40.12"],
                feedbackRefs: ["src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: cláusulas nominales adjetivales excepcionales, cobertura completa de función adjetival nominal/verbal, conjuntos sinónimos de fuente, sintaxis de oración predicado-adjetivo, comportamiento AST de modificación, comportamiento adjetival agentivo de pretérito específico por clase, excepciones raíz-más-ya y ejemplos Nawat/Pipil confirmados.",
    },
    41: {
        pdfRefs: ["Andrews Lesson 41.1-41.4"],
        directive: "Usa Andrews Lección 41 para dirigir la arquitectura de intensificación adjetival nominal y fuente compuesta: troncos intensificados por reduplicación, matrices pah/cal/tzon/afectivas, intensificación por metáfora y símil, troncos verbales compuestos con incrustaciones nominales, troncos verbales denominales desde troncos nominales compuestos y troncos nominales adjetivales incrustados en cláusulas nominales de tronco compuesto.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-41-adjectival-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 41.1-41.4 contra la salida adjetival intensificada actual, rutas adjetivales de tronco verbal compuesto con incrustación nominal, rutas denominales de tronco nominal compuesto y límites de incrustación de tronco nominal adjetival.",
                andrewsRefs: ["Andrews Lesson 41.1-41.4"],
                expectedFeedbackRefs: ["src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-41-adjectival-nnc-audit",
                result: "hit",
                correction: "La Lección 41 ahora registra familias adjetivales nominales intensificadas de Andrews, subtipos de fuente de tronco verbal compuesto con incrustación nominal, fuentes denominales de tronco nominal compuesto y troncos nominales adjetivales como incrustaciones compuestas, preservando las compuertas actuales de generación y evidencia.",
                andrewsRefs: ["Andrews Lesson 41.1-41.4"],
                feedbackRefs: ["src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: familias de troncos intensificados, intensificación de matrices pah/cal/tzon/afectivas, intensificación por metáfora o símil, intensificadores sintácticos, subtipos completos de fuente de tronco verbal compuesto, desambiguación de fuente patientiva de objeto incorporado, troncos nominales adjetivales incrustados en cláusulas nominales de tronco compuesto, sintaxis modificador/núcleo y ejemplos Nawat/Pipil confirmados.",
    },
    42: {
        pdfRefs: ["Andrews Lesson 42.1-42.10"],
        directive: "Usa Andrews Lección 42 para dirigir la arquitectura de modificación adjetival de varios núcleos: relaciones de cláusula modificador/núcleo, anteposición, unidades adjuntas y principales, ambigüedad de suplementación, comportamiento de núcleo compuesto, inventario de tipos de cláusula modificadora, recursión y estructuras incorporadas modificador-núcleo.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-42-adjectival-modification-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 42.1-42.10 contra los metadatos actuales de límite de modificación adjetival, composición AST, orden modificador/núcleo, comportamiento de unidad adjunta/principal, ambigüedad de suplementación, inventario de tipos de cláusula modificadora, recursión y estructuras de modificación incorporada.",
                andrewsRefs: ["Andrews Lesson 42.1-42.10"],
                expectedFeedbackRefs: ["src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-42-adjectival-modification-audit",
                result: "hit",
                correction: "La Lección 42 ahora registra la arquitectura de modificación adjetival de Andrews en modificación de varios núcleos, anteposición, unidades adjuntas/principales, ambigüedad de suplementación, comportamiento de núcleo compuesto, tipos de cláusula modificadora, recursión y estructuras de modificación incorporada, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 42.1-42.10"],
                feedbackRefs: ["src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: sintaxis de modificación de varios núcleos, patrones de orden modificador/núcleo, resolución de ambigüedad de suplementación, selección de matriz en núcleo compuesto, ambigüedad de modificador verbal transitivo, comportamiento de núcleo pronominal/cuantitativo/numeral, comportamiento de núcleo nominal de medida, recursión, estructuras de modificación incorporada, detección de analizador/búsqueda, ejemplos de cláusula con respaldo estático y evidencia Nawat/Pipil confirmada.",
    },
    43: {
        pdfRefs: ["Andrews Lesson 43.1-43.9"],
        directive: "Usa Andrews Lección 43 para dirigir la segunda parte de la arquitectura de modificación adjetival: peculiaridades del modificador no antepuesto, cooperación entre antepuesto y no antepuesto, discontinuidad, núcleos pronominales interrogativos, núcleos oc ce, violaciones idiomáticas de referente compartido, expresiones uno-de/ninguno-de, modificadores de vínculo masculino y modificadores de pareja nombrada.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-43-adjectival-modification-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 43.1-43.9 contra los metadatos actuales de límite de modificación adjetival, comportamiento de modificador no antepuesto, cooperación antepuesta/no antepuesta, discontinuidad, núcleos interrogativos, núcleos oc ce, violaciones de referente compartido, construcciones uno-de/ninguno-de, modificadores de vínculo masculino y modificadores de pareja nombrada.",
                andrewsRefs: ["Andrews Lesson 43.1-43.9"],
                expectedFeedbackRefs: ["src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-43-adjectival-modification-audit",
                result: "hit",
                correction: "La Lección 43 ahora registra la segunda parte de la arquitectura de modificación adjetival de Andrews para modificadores no antepuestos, cooperación con el mismo núcleo, discontinuidad, núcleos interrogativos, oc ce, violaciones idiomáticas de referente compartido, expresiones uno-de/ninguno-de, modificadores de vínculo masculino y modificadores de pareja nombrada, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 43.1-43.9"],
                feedbackRefs: ["src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o diagnósticos: análisis de modificador no antepuesto, resolución de elemento suplementario distante, cooperación antepuesta/no antepuesta con el mismo núcleo, discontinuidad con núcleos topicalizados o modificadores desplazados, ambigüedad de núcleo interrogativo ac/tleh y advertencias internas de unidad, núcleos oc ce, violaciones de referente compartido, modismos uno-de/ninguno-de, modificadores de vínculo masculino, modificadores de pareja nombrada, detección de analizador/búsqueda, ejemplos de cláusula con respaldo estático y evidencia Nawat/Pipil confirmada.",
    },
    44: {
        pdfRefs: ["Andrews Lesson 44.1-44.9"],
        directive: "Usa Andrews Lección 44 para dirigir la arquitectura de cláusulas nucleares adverbiales: pronombres de sujeto adverbializados, adverbialización de primer y segundo grado, cláusulas nucleares verbales y nominales adverbializadas, cláusulas nominales que parecen partículas, otros adverbiales de estado absolutivo, adverbiales agentivos de pretérito, adverbiales de estado posesivo y modificadores adverbiales incorporados.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/adverbial.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-44-adverbial-nuclear-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 44.1-44.9 contra los metadatos actuales de límite de cláusula nuclear adverbial, marcos de salida de adverbio configurado, grados de adverbialización, inventarios de cláusulas nucleares adverbializadas, cláusulas nominales que parecen partículas, adverbiales agentivos de pretérito, adverbiales de estado posesivo y modificadores adverbiales incorporados.",
                andrewsRefs: ["Andrews Lesson 44.1-44.9"],
                expectedFeedbackRefs: ["src/tests/adverbial.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-44-adverbial-nuclear-audit",
                result: "hit",
                correction: "La Lección 44 ahora registra la arquitectura de cláusulas nucleares adverbiales de Andrews: pronombres de sujeto adverbializados, restricciones de grado, cláusulas nucleares adverbializadas, cláusulas nominales que parecen partículas, adverbiales de estado absolutivo y posesivo, adverbiales agentivos de pretérito y modificadores adverbiales incorporados, manteniendo bloqueada la expansión de generación.",
                andrewsRefs: ["Andrews Lesson 44.1-44.9"],
                feedbackRefs: ["src/tests/adverbial.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación completa de cláusulas nucleares adverbiales, adverbiales nominales absolutivos de segundo grado, evidencia estática de cláusulas nominales que parecen partículas, otros adverbiales de estado absolutivo, adverbiales agentivos de pretérito, adverbiales de estado posesivo, modificadores adverbiales incorporados, detección de analizador/búsqueda, datos estáticos adverbiales, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    45: {
        pdfRefs: ["Andrews Lesson 45.1-45.4"],
        directive: "Usa Andrews Lección 45 para dirigir la primera parte de la arquitectura de cláusulas nominales relacionales: sin preposiciones ni posposiciones, troncos nominales relacionales como troncos nominales, significados relacionales de alta generalidad, cuatro opciones de uso relacional, cinco agrupaciones de opciones, troncos solo de opción uno, límites de poseedor suplementario y comportamiento de ic como medio/propósito/razón/tiempo/uso especial.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-45-relational-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 45.1-45.4 contra los metadatos actuales de límite relacional nominal, encuadre sin preposición, opciones de uso de tronco nominal relacional, agrupaciones de opciones, troncos solo de opción uno, límites de poseedor suplementario, funciones de ic y bloqueos de espejismo por traducción.",
                andrewsRefs: ["Andrews Lesson 45.1-45.4"],
                expectedFeedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-45-relational-nnc-audit",
                result: "hit",
                correction: "La Lección 45 ahora registra la arquitectura nominal relacional de Andrews: advertencias sin preposición, cuatro opciones de uso, cinco agrupaciones de opciones, troncos solo de opción uno, límites de poseedor suplementario y comportamiento de ic como medio/propósito/razón/tiempo/uso especial, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 45.1-45.4"],
                feedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación relacional nominal, datos estáticos relacionales, resolución de roles contextuales de alta generalidad, troncos relacionales afectivos, incrustaciones compuestas de opción cuatro, inventarios de troncos solo de opción uno, análisis de poseedor suplementario, usos especiales de ic, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    46: {
        pdfRefs: ["Andrews Lesson 46.1-46.15"],
        directive: "Usa Andrews Lección 46 para dirigir la segunda parte de la arquitectura de cláusulas nominales relacionales: troncos matriz solo de opción dos, locativos con n, incrustaciones ca+n, correspondencias de estado fuente imperfectivo y perfectivo, troncos locativos/direccionales/frecuenciales, advertencias de co/c de parte corporal, inferencia contextual de oración y bloqueo continuo de superficies Nawat/Pipil sin evidencia.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-46-relational-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 46.1-46.15 contra los metadatos actuales de límite relacional nominal, troncos matriz solo de opción dos, locativos con n, incrustaciones ca+n, correspondencias de fuente imperfectiva/perfectiva, troncos locativos/direccionales/frecuenciales, advertencias de matriz de parte corporal y restricciones contextuales de uso oracional.",
                andrewsRefs: ["Andrews Lesson 46.1-46.15"],
                expectedFeedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-46-relational-nnc-audit",
                result: "hit",
                correction: "La Lección 46 ahora registra la segunda parte de la arquitectura nominal relacional de Andrews: once troncos matriz solo de opción dos, formaciones locativas con n, incrustaciones ca+n, reglas de estado fuente imperfectivo/perfectivo, advertencias co/c de parte corporal, separación de pa direccional/frecuencial e inferencia por contexto oracional, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 46.1-46.15"],
                feedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación relacional nominal, datos estáticos relacionales solo de matriz, confirmación ortográfica Nawat/Pipil, verificación ortográfica visible por posición, análisis de poseedor/objeto suplementario, comportamiento interrogativo can/canin, lexicalización co/c de parte corporal, desambiguación de homónimo pa, enrutamiento de adverbio incorporado, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    47: {
        pdfRefs: ["Andrews Lesson 47.1-47.5"],
        directive: "Usa Andrews Lección 47 para dirigir la tercera parte de la arquitectura de cláusulas nominales relacionales: grupos relacionales de opción uno/dos, opción uno/tres y opción uno/dos/tres; cláusulas nominales de entidad asociada; reemplazo silencioso de co/c; cláusulas nominales de pertinencia; y bloqueo de superficies Nawat/Pipil guiadas por traducción o sin evidencia.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-47-relational-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 47.1-47.5 contra los metadatos actuales de límite relacional nominal, grupos de troncos de opción uno/dos, opción uno/tres y opción uno/dos/tres, cláusulas nominales de entidad asociada, cláusulas nominales de pertinencia y bloqueos de complejidad por traducción.",
                andrewsRefs: ["Andrews Lesson 47.1-47.5"],
                expectedFeedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-47-relational-nnc-audit",
                result: "hit",
                correction: "La Lección 47 ahora registra la tercera parte de la arquitectura nominal relacional de Andrews: troncos de opción uno/dos, opción uno/tres y opción uno/dos/tres, formación de entidad asociada, reemplazo silencioso co/c y formación de pertinencia, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 47.1-47.5"],
                feedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación relacional nominal, datos estáticos relacionales, confirmación ortográfica Nawat/Pipil, verificación ortográfica visible por posición, análisis de poseedor suplementario, incrustación pa/copa, compuestos relacionales con t conectiva, distinciones de compuestos de parte corporal, contraste entidad asociada frente a gentilicio, enrutamiento de pertinencia, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    48: {
        pdfRefs: ["Andrews Lesson 48.1-48.13"],
        directive: "Usa Andrews Lección 48 para dirigir la arquitectura de nombres de lugar y gentilicios nominales: referencia única de nombre de lugar adverbializado, siete grupos de nombres de lugar, cuatro rutas de formación gentilicia, ambigüedad ortográfica, incorporación, uso gentilicio adjetival, colectividad, extensiones de profesión/título y bloqueo de superficies Nawat/Pipil guiadas por traducción o sin evidencia.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_place_gentilic.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-48-place-gentilic-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 48.1-48.13 contra los metadatos actuales de límite de nombres de lugar/gentilicios nominales, unicidad de nombre de lugar, siete grupos de nombres de lugar, cuatro rutas de formación gentilicia, incorporación, uso adjetival, colectividad, extensiones de profesión/título y bloqueos de traducción/evidencia.",
                andrewsRefs: ["Andrews Lesson 48.1-48.13"],
                expectedFeedbackRefs: ["src/tests/nnc_place_gentilic.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-48-place-gentilic-audit",
                result: "hit",
                correction: "La Lección 48 ahora registra la arquitectura de nombres de lugar y gentilicios de Andrews: referencia social única, siete grupos de nombres de lugar, cuatro rutas de formación gentilicia, ambigüedad ortográfica, incorporación, uso adjetival, colectividad y extensiones de profesión/título, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 48.1-48.13"],
                feedbackRefs: ["src/tests/nnc_place_gentilic.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación de nombres de lugar, generación gentilicia, datos estáticos de lugar, datos estáticos de gentilicio, confirmación ortográfica Nawat/Pipil, verificación ortográfica visible por posición, resolución de referencia única, análisis de grupos de nombres de lugar, enrutamiento de derivación gentilicia, ambigüedad de ortografía tradicional, incorporación, colectividad, extensión de profesión/título, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    49: {
        pdfRefs: ["Andrews Lesson 49.1-49.10"],
        directive: "Usa Andrews Lección 49 para dirigir la primera parte de la arquitectura de modificación adverbial: orden simple modificador/núcleo, estructuras de varios núcleos, puntos recursivos en modificador, núcleo o ambos, alcance interrogativo e intensificador, colocaciones lexicalizadas partícula-adverbial, aposición de lugar/tiempo, cláusulas principales adverbializadas y bloqueo continuo de superficies Nawat/Pipil sin evidencia.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-49-adverbial-adjunction-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 49.1-49.10 contra los metadatos actuales de límite de adjunción adverbial, comportamiento AST de superficie provista, modificación simple y de varios núcleos, puntos recursivos, alcance interrogativo/intensificador, colocaciones, aposición y comportamiento de cláusula principal adverbial.",
                andrewsRefs: ["Andrews Lesson 49.1-49.10"],
                expectedFeedbackRefs: ["src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-49-adverbial-adjunction-audit",
                result: "hit",
                correction: "La Lección 49 ahora registra la primera parte de la arquitectura de modificación adverbial de Andrews: orden modificador/núcleo, estructuras de varios núcleos, puntos recursivos en núcleo, modificador o ambos, alcance interrogativo e intensificador, colocaciones partícula-adverbial, aposición y cláusulas principales adverbializadas, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 49.1-49.10"],
                feedbackRefs: ["src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: datos estáticos de adjunción adverbial, detección recursiva de analizador/búsqueda, resolución de varios núcleos, ambigüedad de manera comparada, análisis de cláusula principal interrogativa, enrutamiento de intensificador, inventario de colocaciones partícula-adverbial lexicalizadas, ejemplos estáticos de aposición lugar/tiempo, verificación ortográfica visible por posición si los ejemplos se vuelven visibles, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    50: {
        pdfRefs: ["Andrews Lesson 50.1-50.11"],
        directive: "Usa Andrews Lección 50 para dirigir la segunda parte de la arquitectura de modificación adverbial: unidades de cláusula adjunta no adverbializadas, diez tipos de significado, límites de tiempo/lugar/manera/consideración/propósito/condición/concesión/consecuencia/proviso/razón, alcance de partículas y colocaciones, y bloqueo de superficies Nawat/Pipil guiadas por traducción o sin evidencia.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-50-adverbial-adjunction-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 50.1-50.11 contra los metadatos actuales de límite de adjunción adverbial, comportamiento AST de superficie provista, unidades de cláusula adjunta no adverbializadas, diez tipos de significado, partículas de propósito/condición/concesión y comportamiento de ca como introductor de cláusula principal de razón.",
                andrewsRefs: ["Andrews Lesson 50.1-50.11"],
                expectedFeedbackRefs: ["src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-50-adverbial-adjunction-audit",
                result: "hit",
                correction: "La Lección 50 ahora registra la segunda parte de la arquitectura de modificación adverbial de Andrews: unidades de cláusula adjunta no adverbializadas y relaciones de tiempo, lugar, manera, consideración, propósito, condición, concesión, consecuencia, proviso y razón, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 50.1-50.11"],
                feedbackRefs: ["src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: datos estáticos de adjunción adverbial, detección de analizador/búsqueda, análisis de ejemplos estáticos de tiempo/lugar/manera, consideración frente a suplementación de referente incluido, ambigüedad entre propósito y conjunción, análisis de condición abierta e hipotética, inventario de colocaciones de concesión, detección de consecuencia/proviso/razón, verificación ortográfica visible por posición si los ejemplos se vuelven visibles, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    51: {
        pdfRefs: ["Andrews Lesson 51.1-51.4"],
        directive: "Usa Andrews Lección 51 para dirigir la arquitectura de complementación: estructuras de complemento de doble núcleo, complementos de objeto, complementos de sujeto, complementos adverbiales, enlaces pronominales compartidos, transformaciones pasivas de complemento de objeto, complementos relacionales lexicalizados y bloqueo continuo de superficies Nawat/Pipil sin evidencia.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/complement.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-51-complement-clause-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 51.1-51.4 contra los metadatos actuales de límite de complemento, comportamiento AST de superficie provista, estructura de doble núcleo, categorías de complemento de objeto/sujeto/adverbial, enlaces pronominales compartidos, transformaciones pasivas y complementos adverbiales relacionales lexicalizados.",
                andrewsRefs: ["Andrews Lesson 51.1-51.4"],
                expectedFeedbackRefs: ["src/tests/complement.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-51-complement-clause-audit",
                result: "hit",
                correction: "La Lección 51 ahora registra la arquitectura de complementación de Andrews: estructura de complemento de doble núcleo, categorías de complemento de objeto, categorías de complemento de sujeto, familias de troncos de complemento adverbial, transformaciones pasivas de complemento de objeto y comportamiento de complementos relacionales lexicalizados, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 51.1-51.4"],
                feedbackRefs: ["src/tests/complement.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: datos estáticos de complemento, detección de complemento por analizador/búsqueda, inventarios de troncos verbales de complemento de objeto, análisis de estado de complemento de sujeto, enrutamiento de familias de troncos de complemento adverbial, vocabulario relacional lexicalizado, detección de transformación pasiva, verificación ortográfica visible por posición si los ejemplos se vuelven visibles, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    52: {
        pdfRefs: ["Andrews Lesson 52.1-52.7"],
        directive: "Usa Andrews Lección 52 para dirigir la arquitectura de conjunción: concatenación equilibrada sin núcleo, miembros coordinados del mismo rango, conjunción no marcada y marcada, modificadores adverbiales que no son conjuncores, emparejamiento correlativo, innovación léxica por cláusulas nominales coordinadas, estructura paralela reformulativa/progresiva/combinada y bloqueo continuo de superficies Nawat/Pipil sin evidencia.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/conjunction.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-52-conjunction-clause-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 52.1-52.7 contra los metadatos actuales de límite de conjunción, comportamiento AST de superficie provista, conjunción equilibrada sin núcleo, conjunción no marcada y marcada, modificadores adverbiales cercanos a la conjunción, conjunción correlativa, innovación léxica y estructura paralela.",
                andrewsRefs: ["Andrews Lesson 52.1-52.7"],
                expectedFeedbackRefs: ["src/tests/conjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-52-conjunction-clause-audit",
                result: "hit",
                correction: "La Lección 52 ahora registra la arquitectura de conjunción de Andrews: conjunción equilibrada sin núcleo, relaciones no marcadas aditivas/alternativas/adversativas, estructura marcada con auh, modificadores adverbiales que no son conjuncores, emparejamiento correlativo, innovación léxica por cláusulas nominales coordinadas y estructura paralela reformulativa/progresiva/combinada, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 52.1-52.7"],
                feedbackRefs: ["src/tests/conjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: datos estáticos de conjunción, detección de conjunción por analizador/búsqueda, inferencia de relación no marcada, decisiones auh/ortografía, detección de modificador adverbial frente a conjunctor, emparejamiento correlativo, clasificación de biclausalismo/triclausalismo, análisis de estructura paralela, verificación ortográfica visible por posición si los ejemplos se vuelven visibles, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    53: {
        pdfRefs: ["Andrews Lesson 53.1-53.7"],
        directive: "Usa Andrews Lección 53 para dirigir la arquitectura de semejanza y comparación: siete rutas de semejanza, comparación de igualdad frente a diferencia, igualdad, igualdad de tamaño, grado comparativo, preguntas de cuánto más, grado superlativo y bloqueo continuo de deriva hacia salida adjetival o superficies Nawat/Pipil sin evidencia.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/comparison.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-53-comparison-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 53.1-53.7 contra los metadatos actuales de límite de comparación, rutas de semejanza, comparación de igualdad, comparación de tamaño, grado comparativo, preguntas de cuánto más y grado superlativo, bloqueando la deriva hacia salida adjetival.",
                andrewsRefs: ["Andrews Lesson 53.1-53.7"],
                expectedFeedbackRefs: ["src/tests/comparison.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-53-comparison-audit",
                result: "hit",
                correction: "La Lección 53 ahora registra la arquitectura de semejanza/comparación de Andrews: siete rutas de semejanza, comparación de igualdad frente a diferencia, igualdad, comparación de tamaño, grado comparativo, preguntas de cuánto más y grado superlativo, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 53.1-53.7"],
                feedbackRefs: ["src/tests/comparison.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: AST de comparación, datos estáticos de comparación, detección de analizador/búsqueda, clasificación de rutas de semejanza, análisis de iuhqui/ihuan/tloc/tlapanahuia, detección de igualdad y comparación de tamaño, integración de conjunción comparativa, enrutamiento de superlativo, verificación ortográfica visible por posición si los ejemplos se vuelven visibles, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    54: {
        pdfRefs: ["Andrews Lesson 54.1-54.6"],
        directive: "Usa Andrews Lección 54 para dirigir la primera parte de la arquitectura de troncos verbales denominales: formación de tronco nominal a tronco verbal, ti/hui/ya/a/hua incoativos/estativos, ti con poseedor incluido, ti posesivo, límites de ti-lia, ti-a y t-ia, con evidencia Nawat/Pipil controlando las superficies.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-54-denominal-verbstem-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 54.1-54.6 contra el inventario actual de contratos denominales, contratos de regla ejecutable, compuertas de evidencia de fuente, puente ortográfico y bloqueos de generación finita.",
                andrewsRefs: ["Andrews Lesson 54.1-54.6"],
                expectedFeedbackRefs: ["src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-54-denominal-verbstem-audit",
                result: "hit",
                correction: "La Lección 54 ahora registra la primera parte de la arquitectura de troncos verbales denominales de Andrews: sufijos incoativos/estativos, ti con poseedor incluido, ti posesivo, ti-lia, ti-a y t-ia, manteniendo visibles las compuertas de evidencia de fuente y realización Nawat/Pipil.",
                andrewsRefs: ["Andrews Lesson 54.1-54.6"],
                feedbackRefs: ["src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: clasificación completa de fuentes léxicas de la Lección 54, análisis de estado de fuente, semántica de ti posesivo, ti-a de dos objetos en estado posesivo, inventarios limitados de a/hua, ejemplos estáticos Nawat/Pipil, acciones visibles de interfaz y superficies Nawat/Pipil confirmadas.",
    },
    55: {
        pdfRefs: ["Andrews Lesson 55.1-55.7"],
        directive: "Usa Andrews Lección 55 para dirigir la segunda parte de la arquitectura de troncos verbales denominales: tia temporal, tla causativo e intransitivo, o-a intransitivo con contrapartes huia, huia adverbial, o-a/huia de compuesto relacional, i-hui/a-hui hacia o-a e i-a transitivo, con evidencia Nawat/Pipil controlando las superficies.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-55-denominal-verbstem-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 55.1-55.7 contra el inventario actual de contratos denominales, contratos de regla ejecutable, compuertas de evidencia de fuente, puente ortográfico, soporte actual de rutas i-hui/a-hui y bloqueos de generación finita.",
                andrewsRefs: ["Andrews Lesson 55.1-55.7"],
                expectedFeedbackRefs: ["src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-55-denominal-verbstem-audit",
                result: "hit",
                correction: "La Lección 55 ahora registra la segunda parte de la arquitectura de troncos verbales denominales de Andrews: tia temporal, tla causativo e intransitivo, o-a y huia intransitivos, huia adverbial, o-a/huia de compuesto relacional, i-hui/a-hui hacia o-a e i-a transitivo, manteniendo visibles las compuertas de evidencia de fuente y realización Nawat/Pipil.",
                andrewsRefs: ["Andrews Lesson 55.1-55.7"],
                feedbackRefs: ["src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: clasificación completa de fuentes léxicas de la Lección 55, análisis de compuestos temporales, inventarios de tla causativo frente a tla intransitivo, sentidos léxicos de o-a/huia, detección de fuentes adverbiales y relacionales, ejemplos estáticos Nawat/Pipil, acciones visibles de interfaz y superficies Nawat/Pipil confirmadas.",
    },
    56: {
        pdfRefs: ["Andrews Lesson 56.1-56.5"],
        directive: "Usa Andrews Lección 56 para dirigir la arquitectura de cláusulas nominales de nombre personal: predicados de enunciado degradados de dos niveles, separación de sujeto interno/externo, fuentes de cláusula única, fuentes de adjunción, fuentes de conjunción, uso oracional y no generación hasta que exista evidencia Nawat/Pipil confirmada de nombres personales.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_names.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-56-personal-name-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 56.1-56.5 contra los metadatos actuales de límites de nombres personales, clasificadores de falsos positivos, preguntas estructurales y compuertas de no generación.",
                andrewsRefs: ["Andrews Lesson 56.1-56.5"],
                expectedFeedbackRefs: ["src/tests/nnc_names.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-56-personal-name-nnc-audit",
                result: "hit",
                correction: "La Lección 56 ahora registra la arquitectura de dos niveles de nombres personales de Andrews en límites de cláusula única, adjunción, conjunción, uso oracional, título, vocativo, degradación de nombre divino e incrustación de topónimo, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 56.1-56.5"],
                feedbackRefs: ["src/tests/nnc_names.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: análisis completo de fuentes de nombre personal de la Lección 56, ejemplos Nawat/Pipil confirmados de nombres personales, datos estáticos de nombres/calendario, AST de uso oracional, diagnósticos vocativos, rutas de degradación de nombre divino, rutas de incrustación de topónimo, detección de analizador/búsqueda, acciones visibles de interfaz y verificación ortográfica visible por posición.",
    },
    57: {
        pdfRefs: ["Andrews Lesson 57.1-57.7"],
        directive: "Usa Andrews Lección 57 para dirigir los diagnósticos de miscelánea parte uno: uso no sistémico de tiempo, valencia irregular, tópico absoluto, desacuerdo entre suplemento y núcleo, suplementos de cláusula nominal adverbial, morfos pers1 silenciosos y límites de l formadora de tronco nominal antes de tratar cualquier comportamiento textual como implementado.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-57-analysis-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 57.1-57.7 contra los metadatos actuales de límites de análisis textual, clasificadores de falsos positivos, preguntas estructurales y compuertas de no generación.",
                andrewsRefs: ["Andrews Lesson 57.1-57.7"],
                expectedFeedbackRefs: ["src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-57-analysis-audit",
                result: "hit",
                correction: "La Lección 57 ahora registra diagnósticos de miscelánea parte uno de Andrews sobre desajuste tiempo/tiempo verbal, valencia excepcional, tópico absoluto, desacuerdo, suplementos de cláusula nominal adverbial, morfos pers1 silenciosos y límites de l formadora de tronco nominal, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 57.1-57.7"],
                feedbackRefs: ["src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: ejemplos textuales completos de la Lección 57, comportamiento del analizador con contexto oracional, detección de atracción temporal, léxico de irregularidad de valencia, AST de tópico absoluto, rastreo de referente suplemento/núcleo, detección de suplemento de cláusula nominal adverbial, diagnósticos de pers1 silenciosa, datos léxicos de l formadora de tronco nominal, acciones visibles de interfaz y verificación ortográfica visible por posición.",
    },
    58: {
        pdfRefs: ["Andrews Lesson 58.1-58.8"],
        directive: "Usa Andrews Lección 58 para dirigir los diagnósticos de miscelánea parte dos: troncos nominales instrumentales az, formaciones problemáticas de tronco, expresiones exclamativas, construcciones mah, advertencias de sujeto con nombre incorporado y problemas textuales antes de tratar cualquier comportamiento de análisis como implementado.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-58-analysis-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 58.1-58.8 contra los metadatos actuales de límites de análisis textual, clasificadores de falsos positivos, preguntas estructurales y compuertas de no generación.",
                andrewsRefs: ["Andrews Lesson 58.1-58.8"],
                expectedFeedbackRefs: ["src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-58-analysis-audit",
                result: "hit",
                correction: "La Lección 58 ahora registra diagnósticos de miscelánea parte dos de Andrews sobre troncos nominales instrumentales az, formaciones problemáticas, exclamaciones, variantes de construcción mah, advertencias de sujeto con nombre incorporado y problemas textuales, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 58.1-58.8"],
                feedbackRefs: ["src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: ejemplos textuales completos de la Lección 58, datos léxicos de troncos nominales instrumentales, análisis de construcciones problemáticas, clasificación de exclamaciones, AST de construcciones mah, diagnósticos de sujeto con nombre incorporado, flujo de corrección de problemas textuales, comportamiento de analizador/búsqueda, acciones visibles de interfaz y verificación ortográfica visible por posición.",
    },
});

function getAndrewsTrajectoryGroup(lessonId) {
    return ANDREWS_TRAJECTORY_GROUPS.find((group) => lessonId >= group.range[0] && lessonId <= group.range[1]);
}

function getAndrewsTrajectoryImplementationState(lesson) {
    if (lesson.status === "implemented") {
        return "implemented-audited";
    }
    if (lesson.status === "partially-implemented") {
        return "partial";
    }
    if (lesson.status === "not-mapped") {
        return "unmapped";
    }
    return "placeholder";
}

function getAndrewsTrajectoryRedirectAction(lesson) {
    if (lesson.status === "implemented") {
        return "keep";
    }
    if (lesson.status === "not-mapped" || lesson.status === "placeholder") {
        return "block-generation";
    }
    if (/Diagnostic|diagnostic|no confirmed|not modeled|not yet mapped/.test(lesson.notes || "")) {
        return "diagnostic-only";
    }
    return "needs-nawat-evidence";
}

function getAndrewsTrajectoryEvidenceStatus(lesson) {
    if (lesson.status === "implemented") {
        return "direct-pdf-audited";
    }
    if (lesson.status === "partially-implemented") {
        return "direct-pdf-partial";
    }
    return "pdf-index-placeholder";
}

function getAndrewsTrajectoryOrthographyStatus(lesson) {
    if (lesson.id === 2) {
        return "orthography-bridge-required";
    }
    if (lesson.status === "not-mapped" || /no generation|metadata|Diagnostic|syntax|AST|sentence|boundary/.test(lesson.notes || "")) {
        return "not-surface-bearing";
    }
    return "nawat-evidence-required";
}

function getAndrewsPlanPursuitAimStatus(lesson) {
    if (lesson.status === "implemented") {
        return "closest-pass";
    }
    if (lesson.status === "partially-implemented") {
        return "shooting";
    }
    if (lesson.status === "not-mapped") {
        return "blocked";
    }
    return "queued";
}

function buildAndrewsPlannedArrows(lesson, trajectory) {
    return [
        {
            id: `lesson-${lesson.id}-andrews-aim`,
            type: "grammar-trajectory",
            aim: trajectory.directive,
            andrewsRefs: trajectory.pdfRefs,
            expectedFeedbackRefs: trajectory.validationRefs,
        },
    ];
}

function buildAndrewsFiredArrows(lesson, trajectory) {
    if (lesson.status === "not-mapped" || lesson.status === "placeholder") {
        return [];
    }
    return [
        {
            id: `lesson-${lesson.id}-current-alignment`,
            result: "hit",
            correction: lesson.status === "implemented"
                ? "La implementación actual se conserva como el pase más cercano dirigido por Andrews para este paso de lección."
                : "La implementación parcial actual se conserva como un tiro limitado dirigido por Andrews con brechas expuestas.",
            andrewsRefs: trajectory.pdfRefs,
            feedbackRefs: trajectory.validationRefs,
        },
    ];
}

function buildAndrewsLessonTrajectory(lesson) {
    const group = getAndrewsTrajectoryGroup(lesson.id) || ANDREWS_TRAJECTORY_GROUPS[0];
    const override = ANDREWS_FOUNDATION_TRAJECTORY_OVERRIDES[lesson.id] || {};
    const trajectory = {
        pdfRefs: override.pdfRefs || [`Andrews Lesson ${lesson.id}`],
        directive: override.directive || group.directive,
        implementationState: override.implementationState || getAndrewsTrajectoryImplementationState(lesson),
        redirectAction: override.redirectAction || getAndrewsTrajectoryRedirectAction(lesson),
        evidenceStatus: override.evidenceStatus || getAndrewsTrajectoryEvidenceStatus(lesson),
        orthographyStatus: override.orthographyStatus || getAndrewsTrajectoryOrthographyStatus(lesson),
        validationRefs: override.validationRefs || group.validationRefs,
    };
    const aimStatus = getAndrewsPlanPursuitAimStatus(lesson);
    const plannedArrows = Array.isArray(override.plannedArrows)
        ? override.plannedArrows.map((arrow) => ({ ...arrow }))
        : buildAndrewsPlannedArrows(lesson, trajectory);
    const firedArrows = Array.isArray(override.firedArrows)
        ? override.firedArrows.map((arrow) => ({ ...arrow }))
        : buildAndrewsFiredArrows(lesson, trajectory);
    const hitCount = firedArrows.filter((arrow) => arrow.result === "hit").length;
    const missCount = firedArrows.filter((arrow) => arrow.result === "miss").length;
    return {
        ...trajectory,
        stepNumber: lesson.id,
        aimStatus,
        plannedArrows,
        firedArrows,
        hitCount,
        missCount,
        remainingGap: aimStatus === "closest-pass" ? "none" : (override.remainingGap || lesson.notes || "Not yet mapped"),
        closestPass: aimStatus === "closest-pass",
    };
}

const LESSON_REGISTRY_BASE = [
    {
        id: 1,
        title: "Preliminares lingüísticos",
        status: "implemented",
        engineDependencies: ["core/concepts"],
        exampleVerbs: [],
        notes: "El registro diagnóstico de conceptos y notación más el glosario visible de Lección 1 están implementados; no se licencia generación",
    },
    {
        id: 2,
        title: "Pronunciación. Ortografía",
        status: "partially-implemented",
        engineDependencies: ["core/phonology", "core/orthography"],
        exampleVerbs: [],
        notes: "Existen soporte de fonología moderna y silabificación; la ortografía de Andrews/clásica no está modelada por completo",
    },
    {
        id: 3,
        title: "Partículas",
        status: "partially-implemented",
        engineDependencies: ["core/particles"],
        exampleVerbs: [],
        notes: "Existen modo Partícula diagnóstico visible, metadatos de colocación de partículas e inventario semilla derivado de Andrews con ortografía adaptada; no hay inventario local confirmado ni generación",
    },
    {
        id: 4,
        title: "Cláusulas nucleares",
        status: "partially-implemented",
        engineDependencies: ["core/clause"],
        exampleVerbs: [],
        notes: "Existen metadatos de envoltura de cláusula nuclear; la sintaxis oracional completa no está modelada",
    },
    {
        id: 5,
        title: "Fórmula intransitiva de cláusula verbal. Pronombres de sujeto. Morfemas de tiempo",
        status: "implemented",
        engineDependencies: ["core/agreement", "core/vnc", "core/preterit"],
        exampleVerbs: ["nemi", "yawi", "kisa", "miki"],
        notes: "El paradigma intransitivo central está implementado con pase más cercano",
    },
    {
        id: 6,
        title: "Fórmula transitiva de cláusula verbal. Pronombres de objeto",
        status: "implemented",
        engineDependencies: ["core/agreement", "core/vnc"],
        exampleVerbs: ["kua", "itta", "maka"],
        notes: "El paradigma transitivo central está implementado con pase más cercano",
    },
    {
        id: 7,
        title: "Clases de tronco verbal",
        status: "implemented",
        engineDependencies: ["core/vnc", "core/preterit"],
        exampleVerbs: ["nemi", "pewa", "maka", "itta"],
        notes: "Todas las clases de pretérito (A/B/C/D) están implementadas con pase más cercano",
    },
    {
        id: 8,
        title: "Observaciones adicionales sobre cláusulas verbales. Oraciones básicas",
        status: "partially-implemented",
        engineDependencies: ["core/vnc", "core/agreement", "core/sentence"],
        exampleVerbs: [],
        notes: "Existen metadatos mecánicos de cláusula verbal y capa oracional diagnóstica; la generación oracional no está modelada",
    },
    {
        id: 9,
        title: "Modo optativo. Oraciones de deseo. Oraciones de mandato/exhortación",
        status: "partially-implemented",
        engineDependencies: ["core/vnc", "core/sentence"],
        exampleVerbs: ["nemi", "kua"],
        notes: "Las formas finitas optativas de cláusula verbal están implementadas; las construcciones optativas de nivel oracional no están modeladas",
    },
    {
        id: 10,
        title: "Modo admonitivo. Oraciones de advertencia",
        status: "partially-implemented",
        engineDependencies: ["core/vnc", "core/sentence"],
        exampleVerbs: ["nemi", "kua"],
        notes: "Las formas finitas admonitivas de cláusula verbal están implementadas; las construcciones admonitivas de nivel oracional no están modeladas",
    },
    {
        id: 11,
        title: "Cláusulas verbales irregulares",
        status: "partially-implemented",
        engineDependencies: ["core/irregulars"],
        exampleVerbs: ["kati", "yawi", "witzi", "weya"],
        notes: "El subconjunto supletivo Nawat está implementado; los perfectivos irregulares de Andrews, verbos defectivos y desplazamientos tiempo-significado siguen incompletos",
    },
    {
        id: 12,
        title: "Fórmula de cláusula nominal de estado absolutivo. Pronombres de sujeto",
        status: "partially-implemented",
        engineDependencies: ["core/nnc"],
        exampleVerbs: [],
        notes: "Existen derivaciones nominales, pero la generación completa de paradigmas de cláusula nominal sigue incompleta",
    },
    {
        id: 13,
        title: "Fórmula de cláusula nominal de estado posesivo. Pronombres de sujeto y poseedor",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/agreement"],
        exampleVerbs: [],
        notes: "La cláusula nominal de estado posesivo está implementada parcialmente",
    },
    {
        id: 14,
        title: "Clases de tronco nominal",
        status: "partially-implemented",
        engineDependencies: ["core/nnc"],
        exampleVerbs: [],
        notes: "Existe detección de clase de tronco, pero la generación completa de cláusula nominal por clase sigue incompleta",
    },
    {
        id: 15,
        title: "Observaciones adicionales sobre cláusulas nominales",
        status: "partially-implemented",
        engineDependencies: ["core/nnc"],
        exampleVerbs: [],
        notes: "Los límites adicionales de estado posesivo, posesión natural y estructura oracional son diagnósticos; la generación completa de casos de estado sigue sin mapear",
    },
    {
        id: 16,
        title: "Cláusulas nominales pronominales",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/agreement"],
        exampleVerbs: [],
        notes: "Subtipo pronominal, límite solo absolutivo y ortografía fusionada son diagnósticos; no hay generación pronominal de cláusula nominal",
    },
    {
        id: 17,
        title: "Suplementación (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/sentence", "core/clause"],
        exampleVerbs: [],
        notes: "La suplementación de varios núcleos, roles de referente compartido, topicalización y transformaciones de pregunta de información son diagnósticos; no hay AST ni generación de suplementación",
    },
    {
        id: 18,
        title: "Suplementación (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/sentence", "core/clause"],
        exampleVerbs: [],
        notes: "La suplementación integrada, marcada, discontinua, excepcional, de objeto silencioso, vocativa y de orden libre es diagnóstica; no hay AST ni generación de suplementación",
    },
    {
        id: 19,
        title: "Suplementación (parte tres)",
        status: "partially-implemented",
        engineDependencies: ["core/sentence", "core/clause"],
        exampleVerbs: [],
        notes: "Los suplementos de cláusula verbal, suplementación pronominal plural, cláusulas de referente incluido, reporte y estructuras de decir eliminado son diagnósticos; no hay AST oracional ni generación",
    },
    {
        id: 20,
        title: "Tronco verbal no activo",
        status: "implemented",
        engineDependencies: ["core/derivation"],
        exampleVerbs: ["nemi", "kua", "maka"],
        notes: "La derivación no activa está implementada con pase más cercano para Andrews 20.1-20.8",
    },
    {
        id: 21,
        title: "Cláusula verbal de voz pasiva",
        status: "partially-implemented",
        engineDependencies: ["core/derivation", "core/vnc"],
        exampleVerbs: ["kua", "maka"],
        notes: "La cláusula verbal pasiva tiene soporte de tronco no activo y sujeto pasivo, pero Andrews 21.1-21.4 sigue necesitando separación pasiva/impersonal, compuertas de objeto no específico, rutas pasivas reflexivas y de varios objetos, y diagnósticos de capa oracional",
    },
    {
        id: 22,
        title: "Cláusulas verbales impersonales",
        status: "partially-implemented",
        engineDependencies: ["core/derivation", "core/vnc"],
        exampleVerbs: ["nemi", "kua"],
        notes: "La cláusula verbal impersonal tiene soporte de tronco no activo y sujeto impersonal, pero Andrews 22.1-22.6 sigue necesitando separación pasiva/impersonal, inventario impersonal inherente, distinción no animada, compuertas de objeto fuente, ruta del testigo reflexivo ne, diagnósticos de capa oracional y evidencia de derivación ta-impersonal",
    },
    {
        id: 23,
        title: "Más sobre objetos verbales",
        status: "partially-implemented",
        engineDependencies: ["core/agreement", "core/vnc"],
        exampleVerbs: [],
        notes: "Existen alomorfía y combinaciones de prefijos de objeto, pero Andrews 23.1-23.5 sigue necesitando tipificación de función de objeto, contratos discontinuos de objeto causativo/aplicativo, rutas completas de línea principal/línea desviada, tablas de morfemas silenciosos y evidencia del Apéndice C",
    },
    {
        id: 24,
        title: "Troncos verbales causativos (primer tipo). Troncos desacervales",
        status: "partially-implemented",
        engineDependencies: ["core/derivation"],
        exampleVerbs: ["nemi", "kisa", "miki"],
        notes: "Existe derivación causativa de tipo uno y desacerval, pero Andrews 24.1-24.9 sigue necesitando límites de valencia por vocal final, compuertas de tronco neutral de valencia, inventarios desacervales completos, transformaciones de sujeto fuente de cláusula verbal a objeto y diagnósticos de control de a causativa",
    },
    {
        id: 25,
        title: "Troncos verbales causativos (segundo tipo)",
        status: "partially-implemented",
        engineDependencies: ["core/derivation"],
        exampleVerbs: ["temu", "tema", "nemi"],
        notes: "Existe salida causativa de tipo dos, pero Andrews 25.1-25.16 sigue necesitando inventarios de familias fuente, transformaciones de cláusula verbal fuente de uno/dos/tres objetos, diagnósticos de ambigüedad, causativos pasivos/impersonales, modos oracionales y suplementación de objeto silencioso",
    },
    {
        id: 26,
        title: "Troncos verbales aplicativos",
        status: "partially-implemented",
        engineDependencies: ["core/derivation"],
        exampleVerbs: ["maka", "itta", "nemi"],
        notes: "Existe salida aplicativa, pero Andrews 26.1-26.23 sigue necesitando inventarios de familias fuente, excepciones de forma fuente, transformaciones de cláusula verbal fuente de uno/dos/tres objetos, diagnósticos de ambigüedad, aplicativos pasivos/impersonales, modos oracionales, interpretación alternativa de objeto, cláusulas verbales engañosas y control de unidad objeto-más-sufijo",
    },
    {
        id: 27,
        title: "Troncos verbales frecuentativos",
        status: "partially-implemented",
        engineDependencies: ["core/derivation/frequentative"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de límite frecuentativo para Andrews 27.1-27.6, pero siguen pendientes de evidencia: ejemplos frecuentativos Nawat/Pipil confirmados, selección de forma de prefijo, reduplicación de pronombre objeto, frecuentativos desacervales, formaciones inciertas, frecuentativos no activos y generación",
    },
    {
        id: 28,
        title: "Troncos verbales compuestos: incrustación verbal",
        status: "partially-implemented",
        engineDependencies: ["core/parsing", "core/vnc"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de análisis de compuestos y marcos de compuesto para Andrews 28.1-28.12, pero siguen parciales o pendientes de evidencia: generación de incrustación de pretérito con conectivo -t, inventarios limitados de matriz, formaciones especiales pasivas/impersonales, posesión acompañante, compuestos con matriz reflexiva, compuestos de objeto compartido, compuestos de incrustación futura, recursión y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 29,
        title: "Cláusulas verbales purposivas",
        status: "partially-implemented",
        engineDependencies: ["core/vnc/purposive"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de límite purposivo/direccional para Andrews 29.1-29.7, pero siguen parciales o pendientes de evidencia: generación purposiva saliente/entrante, comportamiento de morfema futuro silencioso, desambiguación de longitud vocálica y saltillo, comportamiento opcional o#, plural irregular n, incrustaciones pasivas/impersonales, incrustaciones con tronco compuesto, alternativas externas wal/on, lecturas de propósito cumplido y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 30,
        title: "Troncos verbales compuestos: incrustación nominal",
        status: "partially-implemented",
        engineDependencies: ["core/parsing", "core/vnc"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de incrustación léxica en análisis de compuestos para Andrews 30.1-30.18, pero siguen parciales o pendientes de evidencia: selección de tronco nominal de uso general, reducción de valencia por objeto incorporado, análisis excepcional de fusión ta, transformaciones fuente de adverbial incorporado, transformaciones de suplemento a adverbial, complementos incorporados, reduplicación, rutas no activas y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 31,
        title: "Troncos nominales compuestos",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/compound"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de tronco nominal compuesto para Andrews 31.1-31.13, pero siguen parciales o pendientes de evidencia: análisis compuesto específico de cláusula nominal, segmentación enlazada/sin conectivo/integrada, orientación de poseedor, alomorfía de clase de incrustación, rellenadores únicos, comportamiento de matriz ka/yu, compuestos conjuntivos, compuestos recursivos, patrones de sexo/progenie/compañerismo, troncos de afinidad, troncos distributivos/varietales y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 32,
        title: "Cláusulas nominales afectivas",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/compound"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de cláusula nominal afectiva para Andrews 32.1-32.8, pero siguen parciales o pendientes de evidencia: rutas de clase con matriz afectiva para pil/pol/tzin/ton/zol, cambios lexicalizados de clase, variantes vocativas, afectivos con forma de afinidad, ambigüedad pil niño/noble, comportamiento de número no animado, silenciamiento de número uno en sujeto defectuoso, inventarios de troncos defectivos y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 33,
        title: "Cláusulas verbales honoríficas. Cláusulas verbales peyorativas",
        status: "partially-implemented",
        engineDependencies: ["core/vnc", "core/vnc/honorific_pejorative"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos honoríficos/peyorativos de cláusula verbal para Andrews 33.1-33.10, pero siguen parciales o pendientes de evidencia: generación honorífica, peyorativa y reverencial, selección de ruta reflexiva causativa/aplicativa, ambigüedad de objeto proyectivo, rutas de incrustación de pretérito tzin-u-a y pul-u-a, blanco de transformación de tronco verbal compuesto y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 34,
        title: "Cláusulas nominales de numerales cardinales",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/numerals"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de numerales cardinales en cláusula nominal para Andrews 34.1-34.16, pero siguen parciales o pendientes de evidencia: generación de numerales cardinales, troncos básicos, conteos gruesos, compuestos de orden alto, numerales conjuntados, conjuntos clasificadores, reduplicación, aproximación, medidas y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 35,
        title: "Nominalización de cláusulas verbales (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de nominalización agentiva de pretérito para Andrews 35.1-35.12, y algunas continuaciones Nawat generadas de agentivo de pretérito/uso general/posesión/adverbial existen, pero siguen parciales o pendientes de evidencia: alternancias de número, troncos de afinidad, híbridos de objeto activado, límites de persona anciana, variantes raras, subclases completas de posesión, adverbiales centrados en objeto, reflexivos lexicalizados y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 36,
        title: "Nominalización de cláusulas verbales (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de cláusula verbal nominalizada para Andrews 36.1-36.12, y algunas salidas Nawat agentivas habituales, patientivas, instrumentivas, agentivas de presente/futuro, de acción pasiva y de acción activa existen, pero siguen parciales o pendientes de evidencia: enrutamiento de reanálisis/nominalización plena, posesivos raros, híbridos de objeto activado, excepciones de fuente de estado, incrustaciones futuras lexicalizadas, alternancias de acción de uso restringido/general, sentidos lexicalizados y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 37,
        title: "Troncos nominales deverbales (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de tronco nominal deverbal para Andrews 37.1-37.9, y algunas compuertas Nawat generadas de acción activa s/lis, paciente potencial, acción impersonal y patientivo pasivo existen, pero siguen parciales o pendientes de evidencia: cobertura completa z/liz, incrustaciones compuestas, sintaxis de varios núcleos, compuertas de fuente patientiva pasiva, asimilación tzin y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 38,
        title: "Troncos nominales deverbales (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de patientivo impersonal para Andrews 38.1-38.2, y algunas continuaciones Nawat generadas de patientivo impersonal, ne reflexivo, ta proyectivo, te-a-ta y patientivo compuesto existen, pero siguen parciales o pendientes de evidencia: enrutamiento completo de familias de fuente, selección raíz-más-ya, contraste humano/no humano, formas te anómalas, desambiguación de homónimos, comportamiento patientivo compuesto y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 39,
        title: "Troncos nominales deverbales (parte tres)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de operaciones patientivas para Andrews 39.1-39.9, y algunas continuaciones Nawat generadas perfectivas, imperfectivas, de raíz/acervo, propiedad característica, derivación múltiple, incrustación compuesta, complemento incorporado, objeto incorporado e incrustación de propiedad característica existen, pero siguen parciales o pendientes de evidencia: compuertas completas de fuente, contrastes de posesión orgánica, elección de variante raíz/acervo, inventarios de matriz, manejo de violación de valencia, restricciones idiomáticas y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 40,
        title: "Cláusulas nominales adjetivales (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/adjectival"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de función adjetival nominal para Andrews 40.1-40.12, y algunas continuaciones Nawat optativas de nominal ordinario, verbal, patientivo, verbal nominalizado y raíz-más-ya adjetival existen, pero siguen parciales o pendientes de evidencia: cláusulas nominales adjetivales excepcionales, cobertura completa de función nominal/verbal, conjuntos sinónimos, sintaxis de oración predicado-adjetivo, comportamiento AST de modificación, comportamiento agentivo de pretérito específico por clase, excepciones raíz-más-ya y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 41,
        title: "Cláusulas nominales adjetivales (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/adjectival"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos adjetivales nominales para Andrews 41.1-41.4, y algunas continuaciones Nawat optativas intensificadas, de fuente compuesta y de compuesto denominal existen, pero siguen parciales o pendientes de evidencia: familias de troncos intensificados, intensificación de matriz pah/cal/tzon/afectiva, intensificación por metáfora o símil, intensificadores sintácticos, subtipos completos de fuente de tronco verbal compuesto, desambiguación de fuente patientiva con objeto incorporado, troncos nominales adjetivales incrustados en cláusulas nominales de tronco compuesto, sintaxis modificador/núcleo y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 42,
        title: "Modificación adjetival (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/modification"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de modificación adjetival para Andrews 42.1-42.10, y el AST actual compone superficies Nawat provistas para órdenes seleccionados de modificador/núcleo, pero siguen parciales o diagnósticos: sintaxis de varios núcleos, resolución de ambigüedad de suplementación, selección de matriz en núcleo compuesto, ambigüedad de modificador verbal transitivo, comportamiento de núcleo pronominal/cuantitativo/numeral, comportamiento de núcleo nominal de medida, recursión, estructuras de modificación incorporada, detección de analizador/búsqueda, ejemplos de cláusula con respaldo estático y evidencia Nawat/Pipil confirmada",
    },
    {
        id: 43,
        title: "Modificación adjetival (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/modification"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de modificación adjetival para Andrews 43.1-43.9, y el AST actual puede marcar orden discontinuo en superficies Nawat provistas, pero siguen parciales o diagnósticos: análisis de modificador no antepuesto, cooperación con el mismo núcleo, ambigüedad de núcleo interrogativo, núcleos oc ce, violaciones de referente compartido, modismos uno-de/ninguno-de, modificadores de vínculo masculino, modificadores de pareja nombrada, detección de analizador/búsqueda, ejemplos de cláusula con respaldo estático y evidencia Nawat/Pipil confirmada",
    },
    {
        id: 44,
        title: "Cláusulas nucleares adverbiales",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/adverbial"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de cláusula nuclear adverbial para Andrews 44.1-44.9, y una superficie configurada de adverbio lleva un marco de adverbialización de primer grado, pero siguen parciales o pendientes de evidencia: adverbiales nominales absolutivos de segundo grado, evidencia de cláusulas nominales que parecen partículas, otros adverbiales absolutivos, adverbiales agentivos de pretérito, adverbiales de estado posesivo, modificadores adverbiales incorporados, detección de analizador/búsqueda, datos estáticos adverbiales, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 45,
        title: "Cláusulas nominales relacionales (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/relational"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos relacionales nominales para Andrews 45.1-45.4, y los marcos de uso registran advertencias sin preposición, cuatro opciones relacionales, compuerta de estado posesivo para opción uno, agrupaciones de opciones, troncos solo de opción uno y funciones de ic, pero siguen parciales o pendientes de evidencia: generación relacional, datos estáticos relacionales, análisis de poseedor suplementario, incrustaciones de opción cuatro, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 46,
        title: "Cláusulas nominales relacionales (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/relational"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos relacionales nominales para Andrews 46.1-46.15, y el marco de persecución de la Lección 46 registra troncos matriz solo de opción dos, locativos con n, incrustaciones ca+n, reglas de estado fuente imperfectivo/perfectivo, advertencias co/c de parte corporal, separación pa direccional/frecuencial e inferencia por contexto oracional, pero siguen parciales o pendientes de evidencia: generación relacional, datos relacionales solo de matriz, análisis de poseedor/objeto suplementario, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 47,
        title: "Cláusulas nominales relacionales (parte tres)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/relational"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos relacionales nominales para Andrews 47.1-47.5, y el marco de persecución de la Lección 47 registra grupos relacionales de opción uno/dos, opción uno/tres y opción uno/dos/tres, cláusulas de entidad asociada, reemplazo silencioso co/c y cláusulas de pertinencia, pero siguen parciales o pendientes de evidencia: generación relacional, datos estáticos relacionales, incrustación pa/copa, compuestos con t conectiva, contraste entidad asociada frente a gentilicio, enrutamiento de pertinencia, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 48,
        title: "Nombres de lugar. Gentilicios",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/place_gentilic"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de nombres de lugar/gentilicios para Andrews 48.1-48.13, y el marco de persecución de la Lección 48 registra referencia social única de nombre de lugar, siete grupos de nombres de lugar, cuatro rutas de formación gentilicia, ambigüedad ortográfica, incorporación, uso gentilicio adjetival, colectividad y extensiones de profesión/título, pero siguen parciales o pendientes de evidencia: generación de nombres de lugar, generación gentilicia, datos estáticos de lugar/gentilicio, resolución de referencia única, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 49,
        title: "Modificación adverbial (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/adjunction"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de adjunción adverbial para Andrews 49.1-49.10, y el marco de persecución de la Lección 49 registra orden modificador/núcleo simple, estructuras de varios núcleos, puntos recursivos, alcance interrogativo e intensificador, colocaciones, aposición y cláusulas principales adverbializadas, pero siguen parciales o pendientes de evidencia: datos estáticos de adjunción adverbial, detección recursiva de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 50,
        title: "Modificación adverbial (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/adjunction"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de adjunción adverbial para Andrews 50.1-50.11, y el marco de persecución de la Lección 50 registra unidades de cláusula adjunta no adverbializadas, diez tipos de significado, límites de tiempo/lugar/manera/consideración/propósito/condición/concesión/consecuencia/proviso/razón y ca como introductor de cláusula principal, no como conjunción, pero siguen parciales o pendientes de evidencia: datos estáticos de adjunción adverbial, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 51,
        title: "Complementación",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/complement"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de complemento para Andrews 51.1-51.4, y el marco de persecución de la Lección 51 registra estructuras de doble núcleo, complementos de objeto, complementos de sujeto, complementos adverbiales, transformaciones pasivas de complemento de objeto y complementos relacionales lexicalizados, pero siguen parciales o pendientes de evidencia: datos estáticos de complemento, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 52,
        title: "Conjunción",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/conjunction"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de conjunción para Andrews 52.1-52.7, y el marco de persecución de la Lección 52 registra conjunción equilibrada sin núcleo, conjunción no marcada y marcada, modificadores adverbiales que no son conjuncores, emparejamiento correlativo, innovación léxica por cláusulas nominales coordinadas y estructura paralela reformulativa/progresiva/combinada, pero siguen parciales o pendientes de evidencia: datos estáticos de conjunción, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 53,
        title: "Noción de semejanza. Comparación",
        status: "partially-implemented",
        engineDependencies: ["core/comparison"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de comparación para Andrews 53.1-53.7, y el marco de persecución de la Lección 53 registra siete rutas de semejanza, comparación de igualdad frente a diferencia, igualdad, comparación de tamaño, grado comparativo, preguntas de cuánto más y grado superlativo, pero siguen parciales o pendientes de evidencia: AST de comparación, datos estáticos de comparación, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 54,
        title: "Troncos verbales denominales (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/derivation", "core/vnc"],
        exampleVerbs: [],
        notes: "Existe inventario de contratos denominales y soporte de rutas con evidencia de fuente para Andrews 54.1-54.6, pero siguen parciales o pendientes de evidencia: clasificación completa de fuentes léxicas, semántica de ti posesivo, ti-a de dos objetos, inventarios limitados de a/hua, ejemplos estáticos Nawat/Pipil y acciones visibles de interfaz",
    },
    {
        id: 55,
        title: "Troncos verbales denominales (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/derivation", "core/vnc"],
        exampleVerbs: [],
        notes: "Existe inventario de contratos denominales y soporte de rutas con evidencia de fuente para Andrews 55.1-55.7, incluidos tia temporal, tla causativo/intransitivo, o-a/huia, huia adverbial, o-a/huia de compuesto relacional, i-hui/a-hui hacia o-a e i-a transitivo, pero siguen parciales o pendientes de evidencia: clasificación de fuentes léxicas, ejemplos estáticos Nawat/Pipil, acciones visibles de interfaz y superficies confirmadas",
    },
    {
        id: 56,
        title: "Cláusulas nominales de nombre personal",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/names"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de nombres personales para Andrews 56.1-56.5, y el marco de persecución de la Lección 56 registra predicados de enunciado degradados de dos niveles, separación de sujeto interno/externo, fuentes de cláusula única, fuentes de adjunción, fuentes de conjunción, uso oracional, límites de título/vocativo, degradaciones de nombre divino e incrustaciones de topónimo, pero siguen parciales o pendientes de evidencia: análisis de fuentes de nombre personal, datos estáticos de nombres/calendario, detección de analizador/búsqueda, acciones de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 57,
        title: "Miscelánea (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/analysis"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de análisis para Andrews 57.1-57.7, y el marco de persecución de la Lección 57 registra uso no sistémico de tiempo, valencia irregular, tópico absoluto, desacuerdo suplemento/núcleo, suplementos de cláusula nominal adverbial, morfos pers1 silenciosos y límites de l formadora de tronco nominal, pero siguen parciales o pendientes de evidencia: ejemplos textuales, detección de analizador/búsqueda, AST, acciones de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 58,
        title: "Miscelánea (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/analysis"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de análisis para Andrews 58.1-58.8, y el marco de persecución de la Lección 58 registra troncos nominales instrumentales az, formaciones problemáticas de tronco, expresiones exclamativas, construcciones mah, advertencias de sujeto con nombre incorporado y problemas textuales, pero siguen parciales o pendientes de evidencia: ejemplos textuales, comportamiento de analizador/búsqueda, AST, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
];

const LESSON_REGISTRY = LESSON_REGISTRY_BASE.map((lesson) => ({
    ...lesson,
    trajectory: buildAndrewsLessonTrajectory(lesson),
}));

// Summary counts
const LESSON_STATUS_COUNTS = LESSON_REGISTRY.reduce((acc, lesson) => {
    acc[lesson.status] = (acc[lesson.status] || 0) + 1;
    return acc;
}, {});
