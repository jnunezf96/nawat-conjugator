// Canonical modern ESM module.

export function createClassicalShellModule(targetObject = globalThis) {
    function ClassicalPanelTabs() {
      return `          <div class="panel-stack-tabs" role="tablist" aria-label="Andrews stages">
                <button
                  type="button"
                  class="panel-stack-tab button-with-icon is-active"
                  id="panel-stack-tab-inputs"
                  data-panel-stack-tab="inputs"
                  data-ui-label-key="panel-stack-tab-inputs"
                  data-andrews-panel="#1-source"
                  data-andrews-panel-role="source"
                  role="tab"
                  aria-selected="true"
                  aria-controls="panel-stack-pane-inputs"
                >
                  <span class="button-icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16" focusable="false">
                      <rect x="2.5" y="3" width="11" height="10" rx="2"></rect>
                      <path d="M5 8h6"></path>
                      <path d="M8 5l3 3-3 3"></path>
                    </svg>
                  </span>
                  <span class="panel-stack-tab__step" aria-hidden="true">1</span>
                  <span class="button-label" data-ui-label-target>Source</span>
                </button>
                <button
                  type="button"
                  class="panel-stack-tab button-with-icon"
                  id="panel-stack-tab-formula"
                  data-panel-stack-tab="formula"
                  data-ui-label-key="panel-stack-tab-formula"
                  data-andrews-panel="#2-authority"
                  data-andrews-panel-role="authority"
                  role="tab"
                  aria-selected="false"
                  aria-controls="panel-stack-pane-tense"
                >
                  <span class="button-icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16" focusable="false">
                      <path d="M3 4.5h4.5v4.5"></path>
                      <path d="M7.5 4.5 3 9"></path>
                      <path d="M13 11.5H8.5V7"></path>
                      <path d="M8.5 11.5 13 7"></path>
                    </svg>
                  </span>
                  <span class="panel-stack-tab__step" aria-hidden="true">2</span>
                  <span class="button-label" data-ui-label-target>Authority</span>
                </button>
                <button
                  type="button"
                  class="panel-stack-tab button-with-icon"
                  id="panel-stack-tab-output"
                  data-panel-stack-tab="output"
                  data-ui-label-key="panel-stack-tab-output"
                  data-andrews-panel="#3-authorized-result"
                  data-andrews-panel-role="authorized-result"
                  role="tab"
                  aria-selected="false"
                  aria-controls="container-tense-grid"
                >
                  <span class="button-icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16" focusable="false">
                      <rect x="2.5" y="3" width="11" height="10" rx="2"></rect>
                      <path d="M2.5 6.5h11"></path>
                      <path d="M6 6.5V13"></path>
                      <path d="M9.75 6.5V13"></path>
                    </svg>
                  </span>
                  <span class="panel-stack-tab__step" aria-hidden="true">3</span>
                  <span class="button-label" data-ui-label-target>Result</span>
                </button>
              </div>
    `;
    }
    function ClassicalSourcePanel() {
      return `          <form
                class="panel-stack-pane is-active"
                id="panel-stack-pane-inputs"
                data-panel-stack-pane="inputs"
                data-andrews-stage="source"
                data-andrews-stage-label="1 Source"
                data-andrews-panel="#1-source"
                data-andrews-panel-role="source"
                data-andrews-section="4.1-4.2"
                data-andrews-formula-role="predicate-stem-source"
                data-classical-source-contract="source-only"
                data-classical-source-authorizes="none"
                data-classical-user-generated="source-unit"
                data-classical-machine-generated="rank-classification"
                role="tabpanel"
                aria-labelledby="panel-stack-tab-inputs"
                autocomplete="off"
              >
                <div
                  class="form-container panel nuclear-clause-source-panel"
                  id="container-inputs"
                  data-andrews-component="nuclear-clause-source"
                  data-andrews-contains="clause-kind predicate-stem"
                  data-classical-source-contract="source-only"
                  data-classical-source-authorizes="none"
                  data-classical-user-generated="source-unit"
                  data-classical-machine-generated="rank-classification"
                  data-classical-source-layout="unified-source"
                  data-transcription-line-start="936"
                  data-transcription-line-end="1047"
                  data-exact-witness="Nothing can exist at a higher rank without having passed through a requisite lower stage; except for particles, structural units at this rank are nuclear clauses."
                >
                  <div class="panel-block-title">
                    <button
                      type="button"
                      class="panel-pane-nav-btn panel-pane-nav-btn--prev"
                      data-pane-nav-from="inputs"
                      data-pane-nav-direction="prev"
                      aria-label="Go to previous panel"
                      title="Previous panel"
                    >
                      <span aria-hidden="true">◀</span>
                    </button>
                    <span class="panel-block-step">1</span>
                    <span class="panel-block-text">SOURCE</span>
                    <div class="verb-block__top-controls">
                      <div
                        class="calc-input-mode"
                        role="group"
                        aria-label="Nuclear-clause entry"
                      >
                        <div
                          class="verb-entry-board-tabs"
                          id="verb-entry-board-tabs"
                          role="group"
                          aria-label="Composer entry"
                          data-classical-source-board-mirror="true"
                          data-classical-source-board-mirror-role="engine-sync-not-user-source"
                          data-classical-internal-scaffold="entry-board-mirror"
                        >
                          <button
                            type="button"
                            class="verb-entry-board-tabs__button"
                            data-composer-entry-board="general"
                            data-source-formula-type="CNV"
                            data-target-formula-type="CNV"
                            aria-pressed="true"
                            aria-label="Verbal nuclear clause board"
                            title="Verbal nuclear clause"
                          >
                            <span class="verb-entry-board-tabs__main">Verbal</span>
                            <span class="verb-entry-board-tabs__route">VNC type</span>
                          </button>
                          <button
                            type="button"
                            class="verb-entry-board-tabs__button"
                            data-ordinary-nnc-mode="true"
                            data-source-formula-type="CNN"
                            data-target-formula-type="CNN"
                            id="verb-entry-board-ordinary-nnc"
                            aria-pressed="false"
                            aria-label="Nominal nuclear clause board"
                            title="Nominal nuclear clause"
                          >
                            <span class="verb-entry-board-tabs__main">Nominal</span>
                            <span class="verb-entry-board-tabs__route">NNC type</span>
                          </button>
                          <button
                            type="button"
                            class="verb-entry-board-tabs__button"
                            data-composer-entry-board="noun-to-verb"
                            data-source-formula-type="CNN"
                            data-target-formula-type="CNV"
                            aria-pressed="false"
                            aria-label="Nominal verbalization board"
                            title="Nominal verbalization"
                          >
                            <span class="verb-entry-board-tabs__main">Verbalize</span>
                            <span class="verb-entry-board-tabs__route">NNC → VNC</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="panel-pane-nav-btn panel-pane-nav-btn--next"
                      data-pane-nav-from="inputs"
                      data-pane-nav-direction="next"
                      aria-label="Go to next panel"
                      title="Next panel"
                    >
                      <span aria-hidden="true">▶</span>
                    </button>
                  </div>
                  <div
                    class="classical-basal-unit-controls"
                    id="classical-basal-unit-controls"
                    role="group"
                    aria-label="Classical Nahuatl basal unit"
                    data-classical-basal-unit-controls="true"
                    data-panel-columns="basal-buttons"
                    data-classical-basal-unit-order="particle vnc nnc"
                    data-classical-basal-unit="vnc"
                    data-classical-basal-authority="ANDREWS_TRANSCRIPTION_CANVAS.md"
                    data-nawat-pipil-system="not-used"
                  >
                    <button
                      type="button"
                      class="classical-basal-unit-button"
                      data-classical-basal-unit="particle"
                      data-classical-basal-scope="particle-authority"
                      data-classical-output-owner="particle"
                      data-nuclear-clause-authority="false"
                      aria-pressed="false"
                    >
                      <span class="classical-basal-unit-button__main">Particle</span>
                      <span class="classical-basal-unit-button__sub">outside nuclear clause</span>
                    </button>
                    <button
                      type="button"
                      class="classical-basal-unit-button is-active"
                      data-classical-basal-unit="vnc"
                      data-classical-basal-scope="verbal-nuclear-clause"
                      data-classical-output-owner="vnc"
                      data-nuclear-clause-authority="true"
                      aria-pressed="true"
                    >
                      <span class="classical-basal-unit-button__main">VNC</span>
                      <span class="classical-basal-unit-button__sub">verbal nuclear clause</span>
                    </button>
                    <button
                      type="button"
                      class="classical-basal-unit-button"
                      data-classical-basal-unit="nnc"
                      data-classical-basal-scope="nominal-nuclear-clause"
                      data-classical-output-owner="nnc"
                      data-nuclear-clause-authority="true"
                      aria-pressed="false"
                    >
                      <span class="classical-basal-unit-button__main">NNC</span>
                      <span class="classical-basal-unit-button__sub">nominal nuclear clause</span>
                    </button>
                  </div>
                  <div
                    class="form-group classical-source-unit"
                    data-classical-source-unit="stem-roles-readout"
                  >
                    <section
                      class="verb-block nuclear-clause-entry"
                      id="verb-block"
                      aria-label="Classical source: stem or particle"
                      data-andrews-section="4.1"
                      data-andrews-formula-role="stem-foundation"
                      data-classical-source-contract="stem-or-particle-source"
                      data-transcription-line-start="2326"
                      data-transcription-line-end="2339"
                      data-exact-witness="Nuclear clauses have a hierarchic structure, with the stem always serving as the foundation."
                    >
                      <div
                        class="verb-block__display"
                        data-classical-source-mirror="runtime-only"
                        data-classical-source-authorizes="none"
                      >
                        <span class="verb-block__mirror-label">Machine mirror</span>
                        <div class="verb-block__screen">
                          <div class="verb-input-wrap">
                            <input
                              type="text"
                              id="verb"
                              name="verb"
                              class="verb-input"
                              inputmode="text"
                              aria-label="Entry"
                              data-andrews-input="stem-only"
                              data-andrews-formula-role="stem"
                              data-classical-source-input-role="machine-mirror"
                              data-classical-source-mirror="runtime-only"
                              readonly
                              placeholder="_"
                              autocomplete="off"
                              autocorrect="off"
                              data-lpignore="true"
                              data-1p-ignore="true"
                              autocapitalize="none"
                              spellcheck="false"
                            />
                          </div>
                      </div>
                      <div class="verb-block__hint-row">
                        <div class="verb-composer__hint" id="verb-composer-hint" aria-live="polite"></div>
                      </div>
                    </div>
                    <section
                      class="classical-nnc-source-guide"
                      id="classical-vnc-source-guide"
                      data-classical-vnc-source-guide="canonical-stems"
                      data-classical-source-contract="stem-only"
                      data-classical-source-authorizes="none"
                      data-canvas-example-authority="not-authority"
                      aria-label="VNC canonical verbstems"
                    >
                      <div class="classical-nnc-source-guide__heading">VNC source</div>
                      <label class="classical-nnc-source-guide__field">
                        <span class="classical-nnc-source-guide__label">Canonical verbstem</span>
                        <select
                          id="classical-vnc-source-stem"
                          class="classical-nnc-source-guide__select"
                          data-classical-vnc-source-stem-picker="true"
                        >
                          <option value="">Type a verbstem or choose a canonical stem</option>
                        </select>
                      </label>
                      <p class="classical-nnc-source-guide__rule"><code>...-(...)</code> is transitive; <code>(...)</code> is intransitive. Choosing one loads an editable starter valence and an Andrews-supported Class when available.</p>
                    </section>
                    <section
                      class="classical-nnc-source-guide"
                      id="classical-nnc-source-guide"
                      data-classical-nnc-source-guide="canvas-examples"
                      data-classical-source-contract="stem-only"
                      data-classical-source-authorizes="none"
                      data-canvas-example-authority="not-authority"
                      data-transcription-line-start="4484"
                      data-transcription-line-end="5761"
                      aria-label="NNC source examples"
                      aria-hidden="true"
                      hidden
                    >
                      <div class="classical-nnc-source-guide__heading">NNC source</div>
                      <label class="classical-nnc-source-guide__field">
                        <span class="classical-nnc-source-guide__label">Canonical nounstem</span>
                        <select
                          id="classical-nnc-source-example"
                          class="classical-nnc-source-guide__select"
                          data-classical-nnc-source-example="true"
                          disabled
                        >
                          <option value="">Type a nounstem or choose a canonical stem</option>
                          <optgroup label="Ordinary nounstems">
                            <option value="cal" data-classical-nnc-source-stem="cal" data-classical-nnc-source-mode="whole-stem" data-classical-nnc-type="ordinary" data-classical-nnc-state="absolutive" data-classical-nnc-class="tli" data-classical-nnc-subject="3common" data-classical-nnc-referent="nonanimate" data-transcription-line-start="4716" data-transcription-line-end="4716">(cal) · house · tli class</option>
                            <option value="pah" data-classical-nnc-source-stem="pah" data-classical-nnc-source-mode="whole-stem" data-classical-nnc-type="ordinary" data-classical-nnc-state="absolutive" data-classical-nnc-class="tli" data-classical-nnc-subject="3common" data-classical-nnc-referent="nonanimate" data-transcription-line-start="4715" data-transcription-line-end="4715">(pah) · medicine · tli class</option>
                            <option value="mich" data-classical-nnc-source-stem="mich" data-classical-nnc-source-mode="whole-stem" data-classical-nnc-type="ordinary" data-classical-nnc-state="absolutive" data-classical-nnc-class="in" data-classical-nnc-subject="3sg" data-classical-nnc-referent="animate" data-transcription-line-start="4717" data-transcription-line-end="4717">(mich) · fish · in class</option>
                            <option value="chichi" data-classical-nnc-source-stem="chichi" data-classical-nnc-source-mode="whole-stem" data-classical-nnc-type="ordinary" data-classical-nnc-state="absolutive" data-classical-nnc-class="zero" data-classical-nnc-subject="3sg" data-classical-nnc-referent="animate" data-transcription-line-start="4718" data-transcription-line-end="4718">(chichi) · dog · 0 class</option>
                          </optgroup>
                          <optgroup label="Personal entities">
                            <option value="eh" data-classical-nnc-source-stem="eh" data-classical-nnc-source-mode="whole-stem" data-classical-nnc-type="personal-simple" data-classical-nnc-state="absolutive" data-classical-nnc-subject="1sg" data-transcription-line-start="5385" data-transcription-line-end="5412">(eh) · personal simple · 1st/2nd person</option>
                            <option value="yeh" data-classical-nnc-source-stem="yeh" data-classical-nnc-source-mode="whole-stem" data-classical-nnc-type="personal-simple" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3sg" data-transcription-line-start="5385" data-transcription-line-end="5412">(yeh) · personal simple · 3rd person</option>
                            <option value="eh-huā" data-classical-nnc-source-stem="eh-huā" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="eh" data-classical-nnc-source-matrix="huā" data-classical-nnc-type="personal-compound" data-classical-nnc-state="absolutive" data-classical-nnc-subject="1sg" data-classical-nnc-number-form="sounded" data-transcription-line-start="5413" data-transcription-line-end="5447">(eh-huā) · personal compound · 1st/2nd person</option>
                            <option value="yeh-huā" data-classical-nnc-source-stem="yeh-huā" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="yeh" data-classical-nnc-source-matrix="huā" data-classical-nnc-type="personal-compound" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3sg" data-classical-nnc-number-form="sounded" data-transcription-line-start="5413" data-transcription-line-end="5447">(yeh-huā) · personal compound · 3rd person</option>
                            <option value="yeh-yeh-huā" data-classical-nnc-source-stem="yeh-yeh-huā" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="yeh-yeh" data-classical-nnc-source-matrix="huā" data-classical-nnc-type="personal-compound-derived" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-transcription-line-start="5440" data-transcription-line-end="5442" data-pdf-page="142">(yeh-yeh-huā) · various kinds of entities</option>
                            <option value="eh-eh-huā" data-classical-nnc-source-stem="eh-eh-huā" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="eh-eh" data-classical-nnc-source-matrix="huā" data-classical-nnc-type="personal-compound-derived" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-transcription-line-start="5440" data-transcription-line-end="5442" data-pdf-page="142">(eh-eh-huā) · various kinds of entities</option>
                          </optgroup>
                          <optgroup label="Identity questions">
                            <option value="tl-eh" data-classical-nnc-source-stem="tl-eh" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="tl" data-classical-nnc-source-matrix="eh" data-classical-nnc-type="interrogative-what" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3sg" data-transcription-line-start="5493" data-transcription-line-end="5526">(tl-eh) · what entity?</option>
                            <option value="tl-eh-huā" data-classical-nnc-source-stem="tl-eh-huā" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="tl" data-classical-nnc-source-matrix="eh-huā" data-classical-nnc-type="interrogative-what-compound" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3sg" data-classical-nnc-number-form="sounded" data-transcription-line-start="5523" data-transcription-line-end="5524" data-pdf-page="144">(tl-eh-huā) · what entity? · compound</option>
                            <option value="cā" data-classical-nnc-source-stem="cā" data-classical-nnc-source-mode="whole-stem" data-classical-nnc-type="interrogative-which" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3sg" data-transcription-line-start="5525" data-transcription-line-end="5535" data-pdf-page="144">(cā) · which entity?</option>
                            <option value="cā-tl-eh" data-classical-nnc-source-stem="cā-tl-eh" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="cā" data-classical-nnc-source-matrix="tl-eh" data-classical-nnc-type="interrogative-which-compound" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3sg" data-transcription-line-start="5525" data-transcription-line-end="5535" data-pdf-page="145">(cā-tl-eh) · which entity? · compound</option>
                            <option value="cā-tl-e-in" data-classical-nnc-source-stem="cā-tl-e-in" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="cā" data-classical-nnc-source-matrix="tl-e-in" data-classical-nnc-type="interrogative-which-compound" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3sg" data-transcription-line-start="5525" data-transcription-line-end="5535" data-pdf-page="145">(cā-tl-e-in) · which entity? · fused variant</option>
                            <option value="cā-tl-eh-huā" data-classical-nnc-source-stem="cā-tl-eh-huā" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="cā" data-classical-nnc-source-matrix="tl-eh-huā" data-classical-nnc-type="interrogative-which-compound" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3sg" data-classical-nnc-number-form="sounded" data-transcription-line-start="5525" data-transcription-line-end="5535" data-pdf-page="145">(cā-tl-eh-huā) · which entity? · personal compound</option>
                            <option value="ā-0" data-classical-nnc-source-stem="ā-0" data-classical-nnc-source-mode="internal-morphemes" data-classical-nnc-type="interrogative-who" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3sg" data-transcription-line-start="5527" data-transcription-line-end="5563">(ā-0) · what person?</option>
                          </optgroup>
                          <optgroup label="Demonstratives">
                            <option value="īn" data-classical-nnc-source-stem="īn" data-classical-nnc-source-mode="whole-stem" data-classical-nnc-type="demonstrative-this" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-transcription-line-start="5564" data-transcription-line-end="5584">(īn) · this entity</option>
                            <option value="ōn" data-classical-nnc-source-stem="ōn" data-classical-nnc-source-mode="whole-stem" data-classical-nnc-type="demonstrative-that" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-transcription-line-start="5564" data-transcription-line-end="5584">(ōn) · that entity</option>
                          </optgroup>
                          <optgroup label="Indefinites">
                            <option value="a-c-ah" data-classical-nnc-source-stem="a-c-ah" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="a-c" data-classical-nnc-source-matrix="ah" data-classical-nnc-type="indefinite-someone" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3sg" data-transcription-line-start="5585" data-transcription-line-end="5607">(a-c-ah) · someone</option>
                            <option value="itl-ah" data-classical-nnc-source-stem="itl-ah" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="itl" data-classical-nnc-source-matrix="ah" data-classical-nnc-type="indefinite-something" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-transcription-line-start="5585" data-transcription-line-end="5607">(itl-ah) · something</option>
                          </optgroup>
                          <optgroup label="Amount or number">
                            <option value="ix-qui-ch" data-classical-nnc-source-stem="ix-qui-ch" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="ix" data-classical-nnc-source-matrix="qui-ch" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="quich" data-transcription-line-start="5634" data-transcription-line-end="5673">(ix-qui-ch) · all · qui-ch matrix</option>
                            <option value="cem-ix-qui-ch" data-classical-nnc-source-stem="cem-ix-qui-ch" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="cem-ix" data-classical-nnc-source-matrix="qui-ch" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="quich" data-transcription-line-start="5647" data-transcription-line-end="5648" data-pdf-page="147">(cem-ix-qui-ch) · completely all</option>
                            <option value="quē-x-qui-ch" data-classical-nnc-source-stem="quē-x-qui-ch" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="quē-x" data-classical-nnc-source-matrix="qui-ch" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="quich" data-transcription-line-start="5651" data-transcription-line-end="5657" data-pdf-page="147">(quē-x-qui-ch) · how much / many?</option>
                            <option value="quē-x-ix-qui-ch" data-classical-nnc-source-stem="quē-x-ix-qui-ch" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="quē-x-ix" data-classical-nnc-source-matrix="qui-ch" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="quich" data-transcription-line-start="5658" data-transcription-line-end="5665" data-pdf-page="147">(quē-x-ix-qui-ch) · how many kinds?</option>
                            <option value="miya-qui" data-classical-nnc-source-stem="miya-qui" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="miya" data-classical-nnc-source-matrix="qui" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="qui" data-transcription-line-start="5679" data-transcription-line-end="5687" data-pdf-page="148">(miya-qui) · much / many</option>
                            <option value="miya-c" data-classical-nnc-source-stem="miya-c" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="miya" data-classical-nnc-source-matrix="c" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="qui" data-transcription-line-start="5679" data-transcription-line-end="5687" data-pdf-page="148">(miya-c) · much / many · c variant</option>
                            <option value="miye-qui" data-classical-nnc-source-stem="miye-qui" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="miye" data-classical-nnc-source-matrix="qui" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="qui" data-transcription-line-start="5679" data-transcription-line-end="5687" data-pdf-page="148">(miye-qui) · much / many</option>
                            <option value="miye-c" data-classical-nnc-source-stem="miye-c" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="miye" data-classical-nnc-source-matrix="c" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="qui" data-transcription-line-start="5674" data-transcription-line-end="5700">(miye-c) · much/many · qui matrix</option>
                            <option value="ce-qui" data-classical-nnc-source-stem="ce-qui" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="ce" data-classical-nnc-source-matrix="qui" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="qui" data-transcription-line-start="5689" data-transcription-line-end="5700" data-pdf-page="148">(ce-qui) · one / some / part</option>
                            <option value="iz-qui" data-classical-nnc-source-stem="iz-qui" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="iz" data-classical-nnc-source-matrix="qui" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="qui" data-transcription-line-start="5705" data-transcription-line-end="5713" data-pdf-page="149">(iz-quī) · singular (iz-qui) · equal amount</option>
                            <option value="quē-z-qui" data-classical-nnc-source-stem="quē-z-qui" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="quē-z" data-classical-nnc-source-matrix="qui" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="qui" data-transcription-line-start="5715" data-transcription-line-end="5726" data-pdf-page="149">(quē-z-quī) · singular (quē-z-qui) · how many?</option>
                            <option value="quē-c-iz-qui" data-classical-nnc-source-stem="quē-c-iz-qui" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="quē-c-iz" data-classical-nnc-source-matrix="qui" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="qui" data-transcription-line-start="5727" data-transcription-line-end="5729" data-pdf-page="149">(quē-c-iz-quī) · singular (quē-c-iz-qui) · how many each?</option>
                            <option value="a-qui" data-classical-nnc-source-stem="a-qui" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="a" data-classical-nnc-source-matrix="qui" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="qui" data-transcription-line-start="5731" data-transcription-line-end="5732" data-pdf-page="149">(a-quī) · singular (a-qui) · a few</option>
                            <option value="a-chi" data-classical-nnc-source-stem="a-chi" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="a" data-classical-nnc-source-matrix="chi" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="chi" data-transcription-line-start="5733" data-transcription-line-end="5734" data-pdf-page="149">(a-chī) · singular (a-chi) · a little</option>
                            <option value="mo-chi" data-classical-nnc-source-stem="mo-chi" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="mo" data-classical-nnc-source-matrix="chi" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="chi" data-transcription-line-start="5735" data-transcription-line-end="5750">(mo-chi) · all · chi matrix</option>
                            <option value="mo-ch" data-classical-nnc-source-stem="mo-ch" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="mo" data-classical-nnc-source-matrix="ch" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="chi" data-transcription-line-start="5736" data-transcription-line-end="5740" data-pdf-page="149">(mo-ch) · all · shortened variant</option>
                            <option value="mo-ch-eh-huā" data-classical-nnc-source-stem="mo-ch-eh-huā" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="mo-ch" data-classical-nnc-source-matrix="eh-huā" data-classical-nnc-type="quantitive-personal-compound" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3sg" data-classical-nnc-number-form="sounded" data-transcription-line-start="5749" data-transcription-line-end="5753" data-pdf-page="150">(mo-ch-eh-huā) · all of that entity</option>
                            <option value="ix-a-chi" data-classical-nnc-source-stem="ix-a-chi" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="ix-a" data-classical-nnc-source-matrix="chi" data-classical-nnc-type="quantitive" data-classical-nnc-state="absolutive" data-classical-nnc-subject="3common" data-classical-nnc-quantitive-matrix="chi" data-transcription-line-start="5754" data-transcription-line-end="5758" data-pdf-page="150">(ix-a-chi) · very large amount</option>
                          </optgroup>
                        </select>
                      </label>
                      <p class="classical-nnc-source-guide__rule">Source contains the nounstem only. Subject, State, and number remain outside (STEM).</p>
                    </section>
                    <div
                      class="classical-source-parts"
                      id="classical-source-parts"
                      data-classical-source-parts="user-defined"
                      data-classical-source-contract="source-only"
                      data-classical-source-authorizes="none"
                      data-classical-source-authority="ANDREWS_TRANSCRIPTION_CANVAS.md"
                      data-transcription-line-start="1002"
                      data-transcription-line-end="1014"
                      data-exact-witness="a stem can be a root alone ... a root plus a derivational affix ... a stem plus a derivational affix ... compound stems by combining one stem with another"
                    >
                      <div
                        class="classical-source-parts__mode"
                        role="group"
                        aria-label="Canvas stem structure"
                        data-classical-source-parts-mode="whole-stem"
                      >
                        <button
                          type="button"
                          class="classical-source-parts__mode-button is-active"
                          data-classical-source-parts-kind="whole-stem"
                          data-transcription-line-start="1002"
                          data-transcription-line-end="1014"
                          aria-pressed="true"
                        >Stem</button>
                        <button
                          type="button"
                          class="classical-source-parts__mode-button"
                          data-classical-source-parts-kind="internal-morphemes"
                          data-transcription-line-start="916"
                          data-transcription-line-end="919"
                          aria-pressed="false"
                        >Internal morphs</button>
                        <button
                          type="button"
                          class="classical-source-parts__mode-button"
                          data-classical-source-parts-kind="embed-matrix"
                          data-transcription-line-start="9893"
                          data-transcription-line-end="9917"
                          aria-pressed="false"
                        >Embed + matrix</button>
                      </div>
                      <div class="classical-source-parts__grid" data-classical-source-parts-grid>
                        <label class="classical-source-parts__field classical-source-parts__field--whole">
                          <span class="classical-source-parts__label">Stem</span>
                          <input
                            type="text"
                            id="classical-source-whole"
                            class="classical-source-parts__input"
                            data-classical-source-part-input="whole"
                            autocomplete="off"
                            autocorrect="off"
                            autocapitalize="none"
                            spellcheck="false"
                          />
                        </label>
                        <label class="classical-source-parts__field">
                          <span class="classical-source-parts__label">Embed</span>
                          <input
                            type="text"
                            id="classical-source-embed"
                            class="classical-source-parts__input"
                            data-classical-source-part-input="embed"
                            autocomplete="off"
                            autocorrect="off"
                            autocapitalize="none"
                            spellcheck="false"
                            disabled
                          />
                        </label>
                        <label class="classical-source-parts__field">
                          <span class="classical-source-parts__label">Matrix</span>
                          <input
                            type="text"
                            id="classical-source-matrix"
                            class="classical-source-parts__input"
                            data-classical-source-part-input="matrix"
                            autocomplete="off"
                            autocorrect="off"
                            autocapitalize="none"
                            spellcheck="false"
                            disabled
                          />
                        </label>
                      </div>
                    </div>
                    <div
                      class="classical-source-readout"
                      id="classical-source-readout"
                      role="status"
                      aria-live="polite"
                      data-classical-source-readout="true"
                      data-classical-source-presentation="compact-typed-reading"
                      data-classical-source-contract="source-only"
                      data-classical-source-authorizes="none"
                      data-classical-source-authority="ANDREWS_TRANSCRIPTION_CANVAS.md"
                      data-transcription-line-start="936"
                      data-transcription-line-end="1047"
                      data-exact-witness="Lower-ranked source first; particle and nuclear-clause rank must stay distinct."
                    >
                      <div class="classical-source-readout__item" data-classical-source-readout-item="source">
                        <span class="classical-source-readout__label">(STEM)</span>
                        <span class="classical-source-readout__value" id="classical-source-readout-value">_</span>
                      </div>
                      <div class="classical-source-readout__item" data-classical-source-readout-item="rank">
                        <span class="classical-source-readout__label">Rank</span>
                        <span class="classical-source-readout__value" id="classical-source-readout-rank">VNC stem source</span>
                      </div>
                      <div class="classical-source-readout__item" data-classical-source-readout-item="morphs">
                        <span class="classical-source-readout__label">Morphs</span>
                        <span class="classical-source-readout__value" id="classical-source-readout-morphs">_</span>
                      </div>
                      <div class="classical-source-readout__item" data-classical-source-readout-item="roles">
                        <span class="classical-source-readout__label">Structure</span>
                        <span class="classical-source-readout__value" id="classical-source-readout-roles">one verbstem</span>
                      </div>
                    </div>
                    <section
                      class="classical-nnc-source-analysis"
                      id="classical-nnc-source-analysis"
                      data-classical-nnc-source-analysis="internal-typed-lexical-evidence"
                      data-classical-internal-scaffold="nnc-lexical-analysis-proof-carriers"
                      data-classical-result-proof-only="true"
                      data-classical-source-authorizes="none"
                      aria-hidden="true"
                      hidden
                    >
                      <div
                        class="classical-nnc-source-analysis__grid"
                        id="classical-nnc-source-analysis-controls"
                        data-classical-nnc-source-analysis-controls="true"
                      ></div>
                    </section>
                    <div class="verb-block__separator" aria-hidden="true"></div>
                    <div
                      class="verb-block__controls verb-composer nuclear-clause-composer"
                      id="verb-composer"
                      data-andrews-component="formula-composer"
                      data-andrews-general-formula="subject-predicate"
                      data-classical-internal-scaffold="source-composer-runtime-mirror"
                      data-classical-source-authorizes="none"
                      data-classical-source-board-mirror="true"
                      data-classical-source-board-mirror-role="engine-sync-not-user-source"
                    >
                              <div
                                class="verb-composer__field verb-composer__slot verb-composer__slot-panel"
                                id="composer-slot-stage"
                                role="group"
                                aria-label="Verb composer group"
                                data-andrews-layer="stem-foundation"
                                data-andrews-formula-role="predicate-stem"
                                data-classical-internal-scaffold="source-composer-runtime-mirror"
                                data-classical-source-authorizes="none"
                              ></div>
                              <div class="verb-composer__slot-stash" hidden aria-hidden="true">
                                  <div
                                    class="verb-composer__field verb-composer__slot verb-composer__slot-panel"
                                    id="composer-slot-a"
                                    data-composer-slot-shell="intransitive"
                                    role="group"
                                    aria-label="Intransitive group"
                                  >
                                    <div class="verb-composer__top-row" data-composer-top-row="a">
                                      <div
                                        class="verb-composer__stem-field verb-composer__embed-field"
                                        data-composer-embed-field="a"
                                      >
                                        <span class="verb-composer__sub-label">Embed</span>
                                        <div class="verb-composer__embed-input-row">
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--prefix">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">embed</span>
                                            <input
                                              type="text"
                                              id="composer-embed"
                                              class="verb-composer__input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Embed, slot A"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        class="verb-composer__stem-field verb-composer__matrix-field"
                                        data-composer-matrix-field="a"
                                      >
                                        <div class="verb-composer__matrix-head">
                                          <span class="verb-composer__sub-label">Matrix stem</span>
                                          <div class="verb-composer__slot-tabs verb-composer__slot-tabs--transitivity" role="tablist" aria-label="Verbal valence">
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="intransitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Intransitive"
                                              title="Intransitive"
                                            >
                                              Intransitive
                                            </button>
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="transitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Transitive"
                                              title="Transitive"
                                            >
                                              Transitive
                                            </button>
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="bitransitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Bitransitive"
                                              title="Bitransitive"
                                            >
                                              Bitransitive
                                            </button>
                                          </div>
                                        </div>
                                        <div class="verb-composer__matrix-input-row">
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--verb">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">base</span>
                                            <input
                                              type="text"
                                              id="composer-stem-a"
                                              class="verb-composer__input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Matrix stem, slot A"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                          <div
                                            class="verb-composer__matrix-affix-picker"
                                            data-composer-matrix-affix-picker="a"
                                          >
                                            <button
                                              type="button"
                                              class="verb-chip verb-composer__matrix-affix-trigger"
                                              id="composer-stem-a-affix-trigger"
                                              aria-haspopup="menu"
                                              aria-expanded="false"
                                              aria-controls="composer-stem-a-affix-popover"
                                              aria-label="Open derivation options, slot A"
                                            >
                                              <span class="verb-composer__matrix-affix-trigger-prefix">Derivation</span>
                                              <span
                                                class="verb-composer__matrix-affix-trigger-value"
                                                id="composer-stem-a-affix-trigger-value"
                                                hidden
                                                aria-hidden="true"
                                              ></span>
                                              <span class="verb-composer__matrix-affix-trigger-caret" aria-hidden="true">▾</span>
                                            </button>
                                            <div
                                              class="verb-composer__matrix-affix-popover"
                                              id="composer-stem-a-affix-popover"
                                              role="menu"
                                              aria-label="Derivation options, slot A"
                                              popover="manual"
                                              aria-hidden="true"
                                            >
                                              <div
                                                class="verb-composer__matrix-affix-popover-groups"
                                                data-composer-matrix-affix-chip-groups="a"
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                        <select
                                          id="composer-stem-a-affix"
                                          class="verb-composer__select verb-composer__matrix-affix-select is-hidden-control"
                                          aria-label="Matrix stem options, slot A"
                                          aria-hidden="true"
                                          tabindex="-1"
                                        ></select>
                                        <div
                                          class="verb-composer__chips verb-composer__serial-type-chips"
                                          data-composer-serial-type-chips="a"
                                          role="group"
                                          aria-label="Serial type, slot A"
                                        ></div>
                                      </div>
                                    </div>
                                    <div class="verb-composer__bottom-row">
                                      <div
                                        class="verb-composer__directional-host"
                                        data-composer-directional-host
                                        aria-label="Directional, slot A"
                                      ></div>
                                      <div class="verb-composer__object-pair">
                                        <div class="verb-composer__stem-field verb-composer__bottom-field">
                                          <span class="verb-composer__sub-label">Embed</span>
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--affix">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">embed</span>
                                            <input
                                              type="text"
                                              id="composer-valence-a-embed-left"
                                              class="verb-composer__input verb-composer__valence-embed-input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Embed, slot A"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                        </div>
                                        <div class="verb-composer__valence-main verb-composer__bottom-field">
                                          <span class="verb-composer__sub-label">Object 1/reflexive</span>
                                          <div
                                            class="verb-composer__chips"
                                            id="composer-valence-a-chips"
                                            role="group"
                                            aria-label="Object 1/reflexive, slot A"
                                          ></div>
                                          <select
                                            id="composer-valence-a"
                                            class="verb-composer__select is-hidden-control"
                                            aria-label="Object 1/reflexive, slot A"
                                          >
                                            <option value="">No prefix</option>
                                            <option value="ta">ta</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    class="verb-composer__field verb-composer__slot verb-composer__slot-panel"
                                    id="composer-slot-b"
                                    data-composer-slot-shell="transitive"
                                    role="group"
                                    aria-label="Transitive group"
                                  >
                                    <div class="verb-composer__top-row" data-composer-top-row="b">
                                      <div
                                        class="verb-composer__stem-field verb-composer__embed-field"
                                        data-composer-embed-field="b"
                                      >
                                        <span class="verb-composer__sub-label">Embed</span>
                                        <div class="verb-composer__embed-input-row">
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--prefix">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">embed</span>
                                            <input
                                              type="text"
                                              id="composer-valence-embed-1"
                                              class="verb-composer__input verb-composer__valence-embed-input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Embed, slot B"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        class="verb-composer__stem-field verb-composer__matrix-field"
                                        data-composer-matrix-field="b"
                                      >
                                        <div class="verb-composer__matrix-head">
                                          <span class="verb-composer__sub-label">Matrix stem</span>
                                          <div class="verb-composer__slot-tabs verb-composer__slot-tabs--transitivity" role="tablist" aria-label="Verbal valence">
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="intransitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Intransitive"
                                              title="Intransitive"
                                            >
                                              Intransitive
                                            </button>
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="transitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Transitive"
                                              title="Transitive"
                                            >
                                              Transitive
                                            </button>
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="bitransitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Bitransitive"
                                              title="Bitransitive"
                                            >
                                              Bitransitive
                                            </button>
                                          </div>
                                        </div>
                                        <div class="verb-composer__matrix-input-row">
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--verb">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">base</span>
                                            <input
                                              type="text"
                                              id="composer-stem-b"
                                              class="verb-composer__input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Matrix stem, slot B"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                          <div
                                            class="verb-composer__matrix-affix-picker"
                                            data-composer-matrix-affix-picker="b"
                                          >
                                            <button
                                              type="button"
                                              class="verb-chip verb-composer__matrix-affix-trigger"
                                              id="composer-stem-b-affix-trigger"
                                              aria-haspopup="menu"
                                              aria-expanded="false"
                                              aria-controls="composer-stem-b-affix-popover"
                                              aria-label="Open derivation options, slot B"
                                            >
                                              <span class="verb-composer__matrix-affix-trigger-prefix">Derivation</span>
                                              <span
                                                class="verb-composer__matrix-affix-trigger-value"
                                                id="composer-stem-b-affix-trigger-value"
                                                hidden
                                                aria-hidden="true"
                                              ></span>
                                              <span class="verb-composer__matrix-affix-trigger-caret" aria-hidden="true">▾</span>
                                            </button>
                                            <div
                                              class="verb-composer__matrix-affix-popover"
                                              id="composer-stem-b-affix-popover"
                                              role="menu"
                                              aria-label="Derivation options, slot B"
                                              popover="manual"
                                              aria-hidden="true"
                                            >
                                              <div
                                                class="verb-composer__matrix-affix-popover-groups"
                                                data-composer-matrix-affix-chip-groups="b"
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                        <select
                                          id="composer-stem-b-affix"
                                          class="verb-composer__select verb-composer__matrix-affix-select is-hidden-control"
                                          aria-label="Matrix stem options, slot B"
                                          aria-hidden="true"
                                          tabindex="-1"
                                        ></select>
                                        <div
                                          class="verb-composer__chips verb-composer__serial-type-chips"
                                          data-composer-serial-type-chips="b"
                                          role="group"
                                          aria-label="Serial type, slot B"
                                        ></div>
                                      </div>
                                    </div>
                                    <div class="verb-composer__bottom-row">
                                      <div
                                        class="verb-composer__directional-host"
                                        data-composer-directional-host
                                        aria-label="Directional, slot B"
                                      ></div>
                                      <div class="verb-composer__object-pair">
                                        <div class="verb-composer__stem-field verb-composer__bottom-field">
                                          <span class="verb-composer__sub-label">Embed</span>
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--affix">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">embed</span>
                                            <input
                                              type="text"
                                              id="composer-valence-left-1"
                                              class="verb-composer__input verb-composer__valence-embed-input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Embed, slot B"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                        </div>
                                        <div class="verb-composer__valence-main verb-composer__bottom-field">
                                          <span class="verb-composer__sub-label">Object 1/reflexive</span>
                                          <div
                                            class="verb-composer__chips"
                                            id="composer-valence-chips"
                                            role="group"
                                            aria-label="Object 1/reflexive, slot B"
                                          ></div>
                                          <select
                                            id="composer-valence"
                                            class="verb-composer__select is-hidden-control"
                                            aria-label="Object 1/reflexive, slot B"
                                          >
                                            <option value="">No prefix</option>
                                            <option value="ta">ta</option>
                                            <option value="te">te</option>
                                            <option value="mu">mu</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    class="verb-composer__field verb-composer__slot verb-composer__slot-panel"
                                    id="composer-slot-c"
                                    data-composer-slot-shell="bitransitive"
                                    role="group"
                                    aria-label="Bitransitive group"
                                  >
                                    <div class="verb-composer__top-row" data-composer-top-row="c">
                                      <div
                                        class="verb-composer__stem-field verb-composer__embed-field"
                                        data-composer-embed-field="c"
                                      >
                                        <span class="verb-composer__sub-label">Embed</span>
                                        <div class="verb-composer__embed-input-row">
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--prefix">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">embed</span>
                                            <input
                                              type="text"
                                              id="composer-valence-embed-2"
                                              class="verb-composer__input verb-composer__valence-embed-input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Embed, slot C"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        class="verb-composer__stem-field verb-composer__matrix-field"
                                        data-composer-matrix-field="c"
                                      >
                                        <div class="verb-composer__matrix-head">
                                          <span class="verb-composer__sub-label">Matrix stem</span>
                                          <div class="verb-composer__slot-tabs verb-composer__slot-tabs--transitivity" role="tablist" aria-label="Verbal valence">
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="intransitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Intransitive"
                                              title="Intransitive"
                                            >
                                              Intransitive
                                            </button>
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="transitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Transitive"
                                              title="Transitive"
                                            >
                                              Transitive
                                            </button>
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="bitransitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Bitransitive"
                                              title="Bitransitive"
                                            >
                                              Bitransitive
                                            </button>
                                          </div>
                                        </div>
                                        <div class="verb-composer__matrix-input-row">
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--verb">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">base</span>
                                            <input
                                              type="text"
                                              id="composer-stem-c"
                                              class="verb-composer__input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Matrix stem, slot C"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                          <div
                                            class="verb-composer__matrix-affix-picker"
                                            data-composer-matrix-affix-picker="c"
                                          >
                                            <button
                                              type="button"
                                              class="verb-chip verb-composer__matrix-affix-trigger"
                                              id="composer-stem-c-affix-trigger"
                                              aria-haspopup="menu"
                                              aria-expanded="false"
                                              aria-controls="composer-stem-c-affix-popover"
                                              aria-label="Open derivation options, slot C"
                                            >
                                              <span class="verb-composer__matrix-affix-trigger-prefix">Derivation</span>
                                              <span
                                                class="verb-composer__matrix-affix-trigger-value"
                                                id="composer-stem-c-affix-trigger-value"
                                                hidden
                                                aria-hidden="true"
                                              ></span>
                                              <span class="verb-composer__matrix-affix-trigger-caret" aria-hidden="true">▾</span>
                                            </button>
                                            <div
                                              class="verb-composer__matrix-affix-popover"
                                              id="composer-stem-c-affix-popover"
                                              role="menu"
                                              aria-label="Derivation options, slot C"
                                              popover="manual"
                                              aria-hidden="true"
                                            >
                                              <div
                                                class="verb-composer__matrix-affix-popover-groups"
                                                data-composer-matrix-affix-chip-groups="c"
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                        <select
                                          id="composer-stem-c-affix"
                                          class="verb-composer__select verb-composer__matrix-affix-select is-hidden-control"
                                          aria-label="Matrix stem options, slot C"
                                          aria-hidden="true"
                                          tabindex="-1"
                                        ></select>
                                        <div
                                          class="verb-composer__chips verb-composer__serial-type-chips"
                                          data-composer-serial-type-chips="c"
                                          role="group"
                                          aria-label="Serial type, slot C"
                                        ></div>
                                      </div>
                                    </div>
                                    <div class="verb-composer__bottom-row">
                                      <div
                                        class="verb-composer__directional-host"
                                        data-composer-directional-host
                                        aria-label="Directional, slot C"
                                      ></div>
                                      <div class="verb-composer__object-pair">
                                        <div class="verb-composer__stem-field verb-composer__bottom-field">
                                          <span class="verb-composer__sub-label">Embed</span>
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--affix">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">embed</span>
                                            <input
                                              type="text"
                                              id="composer-valence-left-2"
                                              class="verb-composer__input verb-composer__valence-embed-input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Embed, slot C"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                        </div>
                                        <div class="verb-composer__valence-main verb-composer__bottom-field">
                                          <span class="verb-composer__sub-label">Object 1/object 2/reflexive</span>
                                          <div
                                            class="verb-composer__chips"
                                            id="composer-valence-2-chips"
                                            role="group"
                                            aria-label="Object 1/object 2/reflexive, slot C"
                                          ></div>
                                          <select
                                            id="composer-valence-2"
                                            class="verb-composer__select is-hidden-control"
                                            aria-label="Object 1/object 2/reflexive, slot C"
                                          >
                                            <option value="">No prefix</option>
                                            <option value="te-2">-te</option>
                                            <option value="ta-2">-ta</option>
                                            <option value="mu-2">-mu</option>
                                            <option value="te+te">te-te</option>
                                            <option value="ta+ta">ta-ta</option>
                                            <option value="te+ta">te-ta</option>
                                            <option value="mu+ta">mu-ta</option>
                                            <option value="mu+te">mu-te</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                              </div>
                              <select
                                id="composer-transitivity"
                                class="verb-composer__select is-hidden-control"
                                aria-label="Verbal valence"
                              >
                                <option value="">Select transitivity</option>
                                <option value="intransitive">Intransitive</option>
                                <option value="transitive">Transitive</option>
                                <option value="bitransitive">Bitransitive</option>
                              </select>
                              <div
                                class="verb-composer__field verb-composer__bottom-field"
                                id="composer-directional-field"
                                role="group"
                                aria-label="Directional group"
                              >
                                <span class="verb-composer__sub-label">Directional</span>
                                <div
                                  class="verb-composer__chips"
                                  id="composer-directional-chips"
                                  role="group"
                                  aria-label="Directional"
                                ></div>
                                <select
                                  id="composer-directional"
                                  class="verb-composer__select is-hidden-control"
                                  aria-label="Directional"
                                >
                                  <option value="">No directional</option>
                                </select>
                              </div>
                              <label class="verb-composer__checkbox">
                                <input type="checkbox" id="composer-supportive-i" />
                                <span>optional support i/y [i]/[y]</span>
                              </label>
                              <div
                                class="verb-composer__supportive-toggle-row"
                                id="composer-supportive-i-row"
                                role="group"
                                aria-label="support i/y"
                                hidden
                                aria-hidden="true"
                              >
                                <button
                                  type="button"
                                  class="verb-chip verb-composer__supportive-i-button button-with-icon"
                                  id="verb-key-supportive-i"
                                  aria-pressed="false"
                                  aria-label="Apply optional support i/y. Pattern: [i] or [y]. y rule: #+(y)V>yV; C+(y)V>CV; V+(y)e>Ve; i+(y)V>iV; X+(y)Vj(y)V>XVjV."
                                  title="optional support i/y. Pattern: [i] or [y]. y rule: #+(y)V>yV; C+(y)V>CV; V+(y)e>Ve; i+(y)V>iV; X+(y)Vj(y)V>XVjV."
                                >
                                  <span class="button-icon button-icon--supportive" aria-hidden="true">
                                    i
                                  </span>
                                  <span class="button-label">support i/y</span>
                                </button>
                              </div>
                          <div class="verb-composer__placeholder" id="verb-composer-placeholder" aria-hidden="true">
                            <div class="calc-regex-card">
                              <div class="calc-regex-title">Active pattern</div>
                              <div class="calc-regex-body">
                                Type the direct pattern on the screen to search or derive without menus.
                              </div>
                            </div>
                        </div>
                      </div>
                      <div class="verb-block__feedback">
                        <div class="verb-rule is-empty" id="verb-rule" aria-live="polite">
                          <span class="verb-rule__label">Regla</span>
                          <span class="verb-rule__text" id="verb-rule-text"></span>
                        </div>
                        <div
                          class="verb-disambiguation is-empty"
                          id="verb-disambiguation"
                          aria-live="polite"
                        >
                          <span class="verb-disambiguation__label" id="verb-disambiguation-label"
                            >Quisiste decir</span
                          >
                          <div class="verb-disambiguation__options" id="verb-disambiguation-options"></div>
                        </div>
                      </div>
                    </section>
                  </div>
                  <input
                    type="hidden"
                    id="subject-prefix"
                    name="subject-prefix"
                    value=""
                    data-andrews-formula-role="subject"
                    data-andrews-formula-slot="person-prefix"
                    data-classical-internal-scaffold="legacy-subject-runtime-mirror"
                    data-classical-source-authorizes="none"
                  />
                  <input
                    type="hidden"
                    id="subject-suffix"
                    name="subject-suffix"
                    value=""
                    data-andrews-formula-role="subject"
                    data-andrews-formula-slot="number-suffix"
                    data-classical-internal-scaffold="legacy-subject-runtime-mirror"
                    data-classical-source-authorizes="none"
                  />
                </div>
              </form>
    `;
    }
    function ClassicalAuthorityPanel() {
      return `          <section
                class="panel tense-tabs-panel formula-controls-panel panel-stack-pane"
                id="panel-stack-pane-tense"
                data-panel-stack-pane="formula"
                data-andrews-stage="authority-controls"
                data-andrews-stage-label="2 Authority"
                data-andrews-panel="#2-authority"
                data-andrews-panel-role="authority"
                data-andrews-section="4.3-4.5"
                data-andrews-general-formula="subject-predicate"
                data-andrews-subject-formula="#person+...+number#"
                data-andrews-vnc-predicate="valence+stem+tense"
                data-andrews-nnc-predicate="state+stem"
                data-andrews-vnc-layers="verbstem > verbcore > predicate > CNV"
                data-andrews-nnc-layers="nounstem > nouncore/predicate > CNN"
                role="tabpanel"
                aria-labelledby="panel-stack-tab-formula"
              >
                <div class="panel-block-title">
                  <button
                    type="button"
                    class="panel-pane-nav-btn panel-pane-nav-btn--prev"
                    data-pane-nav-from="formula"
                    data-pane-nav-direction="prev"
                    aria-label="Go to previous panel"
                    title="Previous panel"
                  >
                    <span aria-hidden="true">◀</span>
                  </button>
                  <span class="panel-block-step">2</span>
                  <span class="panel-block-text">AUTHORITY</span>
                  <button
                    type="button"
                    class="panel-pane-nav-btn panel-pane-nav-btn--next"
                    data-pane-nav-from="formula"
                    data-pane-nav-direction="next"
                    aria-label="Go to next panel"
                    title="Next panel"
                  >
                    <span aria-hidden="true">▶</span>
                  </button>
                </div>
                <div
                  class="calc-operators formula-controls-grid"
                  data-andrews-formula-role="formula-mode-derivation-controls"
                  aria-label="Formula controls"
                >
                  <section
                    class="calc-operator calc-operator--mode calc-operator--source-authority-mirror"
                    data-classical-authority-follows-source="true"
                    aria-label="Authority determined by Source"
                  >
                    <div class="calc-operator__label">Source Authority</div>
                    <div
                      class="calc-operator-grid calc-operator-grid--mode"
                      role="group"
                      aria-label="Internal Source mirror"
                    >
                      <button
                        type="button"
                        class="calc-operator-chip"
                        data-tense-mode="verbo"
                        data-mode-system="unit"
                        data-classical-authority-mirror="vnc"
                        aria-pressed="true"
                      >
                        <span class="calc-operator-chip__main">VNC</span>
                        <span class="calc-operator-chip__unit">VNC authority</span>
                        <span class="calc-operator-chip__route">VNC Source</span>
                      </button>
                      <button
                        type="button"
                        class="calc-operator-chip"
                        data-tense-mode="sustantivo"
                        data-mode-system="unit"
                        data-classical-authority-mirror="nnc"
                        aria-pressed="false"
                      >
                        <span class="calc-operator-chip__main">NNC</span>
                        <span class="calc-operator-chip__unit">NNC authority</span>
                        <span class="calc-operator-chip__route">NNC Source</span>
                      </button>
                    </div>
                    <div class="calc-unit-route-strip" aria-label="Andrews mixed route">
                      <span class="calc-unit-route-strip__label">Source</span>
                      <span class="calc-unit-route-strip__route">Particle / VNC / NNC</span>
                    </div>
                    <button
                      type="button"
                      class="calc-operator-chip calc-operator-chip--lesson3-particles"
                      id="classical-lesson3-particles-output"
                      data-classical-nahuatl-particles-output="true"
                      data-classical-authority-mirror="particle"
                      aria-pressed="false"
                      aria-label="Show Andrews Lesson 3 particles in result"
                      title="Particles · Andrews Lesson 3"
                    >
                      <span class="calc-operator-chip__main">Particle</span>
                      <span class="calc-operator-chip__unit">Lesson 3 authority</span>
                      <span class="calc-operator-chip__route">outside nuclear clause</span>
                    </button>
                  </section>
                  <section
                    class="calc-operator calc-operator--derivation"
                    aria-label="Verbal derivation"
                  >
                    <div class="calc-operator__label">Derivation</div>
                    <div
                      class="calc-operator-grid calc-operator-grid--derivation"
                      role="tablist"
                      aria-label="Verbal derivation"
                    >
                      <button
                        type="button"
                        class="calc-operator-chip"
                        data-derivation-type="direct"
                        data-classical-authority-option-tag="cn-option-vnc-derivation-direct"
                        aria-pressed="true"
                      >
                        Direct
                      </button>
                      <button
                        type="button"
                        class="calc-operator-chip"
                        data-derivation-type="causative"
                        data-classical-authority-option-tag="cn-option-vnc-derivation-causative"
                        aria-pressed="false"
                      >
                        <span class="calc-operator-chip__main">Causative</span>
                      </button>
                      <button
                        type="button"
                        class="calc-operator-chip"
                        data-derivation-type="applicative"
                        data-classical-authority-option-tag="cn-option-vnc-derivation-applicative"
                        aria-pressed="false"
                      >
                        <span class="calc-operator-chip__main">Applicative</span>
                      </button>
                    </div>
                  </section>
                  <section
                    class="calc-operator calc-operator--classical-rule-logic"
                    id="classical-rule-logic-controls"
                    data-classical-rule-logic-controls="true"
                    data-classical-nahuatl-source-document="ANDREWS_TRANSCRIPTION_CANVAS.md"
                    data-nawat-pipil-system="not-used"
                    aria-label="Classical Nahuatl rule logic"
                  >
                    <div class="calc-operator__label">Logic</div>
                    <div class="classical-rule-controls-grid">
                      <input
                        type="hidden"
                        id="classical-rule-logic-lesson"
                        data-classical-rule-logic-control="lesson"
                        data-classical-proof-scope-internal="true"
                        value="7"
                      />
                      <div class="classical-nnc-authority-heading" data-classical-nnc-authority-heading="subject" hidden aria-hidden="true">Subject</div>
                      <div class="classical-nnc-authority-heading" data-classical-nnc-authority-heading="predicate" hidden aria-hidden="true">Predicate</div>
                      <div class="classical-nnc-authority-heading" data-classical-nnc-authority-heading="sentence" hidden aria-hidden="true">Sentence</div>
                      <div class="classical-vnc-authority-heading" data-classical-vnc-authority-heading="verbstem" hidden aria-hidden="true">Verbstem</div>
                      <div class="classical-vnc-authority-heading" data-classical-vnc-authority-heading="derivation" hidden aria-hidden="true">Derivation</div>
                      <div class="classical-vnc-authority-heading" data-classical-vnc-authority-heading="subject" hidden aria-hidden="true">Subject</div>
                      <div class="classical-vnc-authority-heading" data-classical-vnc-authority-heading="predicate" hidden aria-hidden="true">Predicate</div>
                      <div class="classical-vnc-authority-heading" data-classical-vnc-authority-heading="sentence" hidden aria-hidden="true">Sentence</div>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="subject-person">
                        <span class="classical-rule-control__label">Subject</span>
                        <select
                          id="classical-rule-logic-subject"
                          data-classical-rule-logic-control="subject"
                        >
                          <option value="1sg" data-classical-authority-option-tag="cn-option-subject-1sg" selected>1sg</option>
                          <option value="2sg" data-classical-authority-option-tag="cn-option-subject-2sg">2sg</option>
                          <option value="3sg" data-classical-authority-option-tag="cn-option-subject-3sg">3sg</option>
                          <option value="3common" data-classical-authority-option-tag="cn-option-subject-3common">3 common</option>
                          <option value="1pl" data-classical-authority-option-tag="cn-option-subject-1pl">1pl</option>
                          <option value="2pl" data-classical-authority-option-tag="cn-option-subject-2pl">2pl</option>
                          <option value="3pl" data-classical-authority-option-tag="cn-option-subject-3pl">3pl</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="subject" data-classical-nnc-authority-order="subject-person" hidden>
                        <span class="classical-rule-control__label">Person</span>
                        <select id="classical-rule-logic-nnc-subject-person" data-classical-rule-logic-control="nnc-subject-person">
                          <option value="1" data-classical-authority-option-tag="cn-option-nnc-subject-person-1">first</option>
                          <option value="2" data-classical-authority-option-tag="cn-option-nnc-subject-person-2">second</option>
                          <option value="3" data-classical-authority-option-tag="cn-option-nnc-subject-person-3" selected>third</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="subject" data-classical-nnc-authority-order="subject-animacy" hidden>
                        <span class="classical-rule-control__label">Referent</span>
                        <select id="classical-rule-logic-nnc-subject-animacy" data-classical-rule-logic-control="nnc-subject-animacy">
                          <option value="animate" data-classical-authority-option-tag="cn-option-nnc-subject-animacy-animate" selected>animate</option>
                          <option value="nonanimate" data-classical-authority-option-tag="cn-option-nnc-subject-animacy-nonanimate">nonanimate</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="subject" data-classical-nnc-authority-order="subject-number" hidden>
                        <span class="classical-rule-control__label">Number</span>
                        <select id="classical-rule-logic-nnc-subject-number" data-classical-rule-logic-control="nnc-subject-number">
                          <option value="singular" data-classical-authority-option-tag="cn-option-nnc-subject-number-singular" selected>singular</option>
                          <option value="common" data-classical-authority-option-tag="cn-option-nnc-subject-number-common">common</option>
                          <option value="plural" data-classical-authority-option-tag="cn-option-nnc-subject-number-plural">plural</option>
                        </select>
                      </label>
                      <label class="classical-rule-control classical-rule-control--internal-mirror" data-classical-nnc-authority-control="type" data-classical-authority-internal-mirror="nnc-source-kind" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Source kind</span>
                        <select id="classical-rule-logic-nnc-type" data-classical-rule-logic-control="nnc-type">
                          <option value="ordinary" data-classical-authority-option-tag="cn-option-nnc-type-ordinary" selected>ordinary nounstem</option>
                          <option value="personal-simple" data-classical-authority-option-tag="cn-option-nnc-type-personal-simple">personal simple</option>
                          <option value="personal-compound" data-classical-authority-option-tag="cn-option-nnc-type-personal-compound">personal compound</option>
                          <option value="personal-compound-derived" data-classical-authority-option-tag="cn-option-nnc-type-personal-compound-derived">derived personal compound</option>
                          <option value="interrogative-what" data-classical-authority-option-tag="cn-option-nnc-type-interrogative-what">what entity</option>
                          <option value="interrogative-what-compound" data-classical-authority-option-tag="cn-option-nnc-type-interrogative-what-compound">what entity compound</option>
                          <option value="interrogative-which" data-classical-authority-option-tag="cn-option-nnc-type-interrogative-which">which entity</option>
                          <option value="interrogative-which-compound" data-classical-authority-option-tag="cn-option-nnc-type-interrogative-which-compound">which entity compound</option>
                          <option value="interrogative-who" data-classical-authority-option-tag="cn-option-nnc-type-interrogative-who">what person</option>
                          <option value="demonstrative-this" data-classical-authority-option-tag="cn-option-nnc-type-demonstrative-this">this entity</option>
                          <option value="demonstrative-that" data-classical-authority-option-tag="cn-option-nnc-type-demonstrative-that">that entity</option>
                          <option value="indefinite-someone" data-classical-authority-option-tag="cn-option-nnc-type-indefinite-someone">someone</option>
                          <option value="indefinite-something" data-classical-authority-option-tag="cn-option-nnc-type-indefinite-something">something</option>
                          <option value="quantitive" data-classical-authority-option-tag="cn-option-nnc-type-quantitive">amount / number</option>
                          <option value="quantitive-personal-compound" data-classical-authority-option-tag="cn-option-nnc-type-quantitive-personal-compound">amount / personal compound</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="discourse" data-classical-nnc-authority-order="sentence-position" hidden>
                        <span class="classical-rule-control__label">Clause position</span>
                        <select id="classical-rule-logic-nnc-clause-position" data-classical-rule-logic-control="nnc-clause-position">
                          <option value="initial" data-classical-authority-option-tag="cn-option-nnc-clause-position-initial" selected>initial</option>
                          <option value="noninitial" data-classical-authority-option-tag="cn-option-nnc-clause-position-noninitial">noninitial</option>
                        </select>
                      </label>
                      <label class="classical-rule-control classical-rule-control--checkbox" data-classical-nnc-authority-control="context" data-classical-nnc-authority-order="context-doubled-first-plural" hidden>
                        <span class="classical-rule-control__label">Doubled first plural</span>
                        <input
                          type="checkbox"
                          id="classical-rule-logic-nnc-doubled-first-plural"
                          value="doubled"
                          data-classical-rule-logic-control="nnc-doubled-first-plural"
                          data-classical-checked-value="doubled"
                          data-classical-unchecked-value="ordinary"
                          data-classical-checked-authority-option-tag="cn-option-nnc-doubled-first-plural-enabled"
                          data-classical-unchecked-authority-option-tag="cn-option-nnc-doubled-first-plural-disabled"
                        />
                      </label>
                      <label class="classical-rule-control classical-rule-control--checkbox" data-classical-nnc-authority-control="context" data-classical-nnc-authority-order="context-dependent-in" hidden>
                        <span class="classical-rule-control__label">Dependent clause introduced by in</span>
                        <input
                          type="checkbox"
                          id="classical-rule-logic-nnc-dependent-clause-in"
                          value="present"
                          data-classical-rule-logic-control="nnc-dependent-clause-in"
                          data-classical-checked-value="present"
                          data-classical-unchecked-value="absent"
                          data-classical-checked-authority-option-tag="cn-option-nnc-dependent-clause-in-present"
                          data-classical-unchecked-authority-option-tag="cn-option-nnc-dependent-clause-in-absent"
                        />
                      </label>
                      <label class="classical-rule-control classical-rule-control--checkbox" data-classical-nnc-authority-control="context" data-classical-nnc-authority-order="context-special-human-use" hidden>
                        <span class="classical-rule-control__label">Special human use of itlah</span>
                        <input
                          type="checkbox"
                          id="classical-rule-logic-nnc-special-human-use"
                          value="selected"
                          data-classical-rule-logic-control="nnc-special-human-use"
                          data-classical-checked-value="selected"
                          data-classical-unchecked-value="not-selected"
                          data-classical-checked-authority-option-tag="cn-option-nnc-special-human-use-selected"
                          data-classical-unchecked-authority-option-tag="cn-option-nnc-special-human-use-not-selected"
                        />
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="ordinary" data-classical-nnc-authority-order="predicate-state" hidden>
                        <span class="classical-rule-control__label">State</span>
                        <select id="classical-rule-logic-nnc-state" data-classical-rule-logic-control="nnc-state">
                          <option value="absolutive" data-classical-authority-option-tag="cn-option-nnc-state-absolutive" selected>absolutive</option>
                          <option value="possessive" data-classical-authority-option-tag="cn-option-nnc-state-possessive">possessive</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="ordinary" data-classical-nnc-authority-order="stem-formation" hidden>
                        <span class="classical-rule-control__label">Stem formation</span>
                        <select id="classical-rule-logic-nnc-predicate-form" data-classical-rule-logic-control="nnc-predicate-form">
                          <option value="source-stem" data-classical-authority-option-tag="cn-option-nnc-predicate-source" selected>source stem</option>
                          <option value="yo-matrix" data-classical-authority-option-tag="cn-option-nnc-yo-matrix">(-yō)-tl- matrix</option>
                          <option value="secondary-general-use" data-classical-authority-option-tag="cn-option-nnc-secondary-general-use">secondary general-use stem (tē-)</option>
                          <option value="analogical-restricted-use" data-classical-authority-option-tag="cn-option-nnc-analogical-restricted-use">analogical restricted-use stem (tla-)</option>
                          <option value="tec-title" data-classical-authority-option-tag="cn-option-nnc-predicate-tec-title">special general-use stem (tēc)</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="lexical" data-classical-nnc-authority-order="lexical-state-policy" hidden>
                        <span class="classical-rule-control__label">State availability</span>
                        <select id="classical-rule-logic-nnc-state-policy" data-classical-rule-logic-control="nnc-state-policy">
                          <option value="ordinary" data-classical-authority-option-tag="cn-option-nnc-state-policy-ordinary" selected>both states</option>
                          <option value="naturally-possessed" data-classical-authority-option-tag="cn-option-nnc-state-policy-naturally-possessed">naturally possessed - possessive only</option>
                          <option value="never-possessive" data-classical-authority-option-tag="cn-option-nnc-state-policy-never-possessive">never possessive - absolutive unless metaphorical</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="lexical" data-classical-nnc-authority-order="lexical-possessor-compatibility" hidden>
                        <span class="classical-rule-control__label">tla compatibility</span>
                        <select id="classical-rule-logic-nnc-possessor-compatibility" data-classical-rule-logic-control="nnc-possessor-compatibility">
                          <option value="ordinary" data-classical-authority-option-tag="cn-option-nnc-possessor-compatibility-ordinary" selected>ordinary source - no tla</option>
                          <option value="relational-tla" data-classical-authority-option-tag="cn-option-nnc-possessor-compatibility-relational">relational source - tla available</option>
                          <option value="analogical-tla-derived" data-classical-authority-option-tag="cn-option-nnc-possessor-compatibility-analogical">analogical derived source - tla available</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="lexical" data-classical-nnc-authority-order="lexical-constituent-ambiguity" hidden>
                        <span class="classical-rule-control__label">Constituent ambiguity</span>
                        <select id="classical-rule-logic-nnc-constituent-ambiguity" data-classical-rule-logic-control="nnc-constituent-ambiguity">
                          <option value="none" data-classical-authority-option-tag="cn-option-nnc-constituent-ambiguity-none" selected>one typed analysis</option>
                          <option value="front-o" data-classical-authority-option-tag="cn-option-nnc-constituent-ambiguity-front-o">front o: st2 or stem</option>
                          <option value="front-m" data-classical-authority-option-tag="cn-option-nnc-constituent-ambiguity-front-m">front m: st2 or stem</option>
                          <option value="back-uh" data-classical-authority-option-tag="cn-option-nnc-constituent-ambiguity-back-uh">final uh: stem or num1</option>
                          <option value="back-tl" data-classical-authority-option-tag="cn-option-nnc-constituent-ambiguity-back-tl">final tl: stem or num1</option>
                          <option value="back-tli" data-classical-authority-option-tag="cn-option-nnc-constituent-ambiguity-back-tli">final tli: stem or num1</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="lexical" data-classical-nnc-authority-order="lexical-constituent-alternative" hidden>
                        <span class="classical-rule-control__label">Alternative nounstem</span>
                        <input id="classical-rule-logic-nnc-constituent-alternative-stem" type="text" autocomplete="off" spellcheck="false" placeholder="exact stem, including macrons" data-classical-rule-logic-control="nnc-constituent-alternative-stem">
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="lexical" data-classical-nnc-authority-order="lexical-constituent-analysis" hidden>
                        <span class="classical-rule-control__label">Constituent analysis</span>
                        <select id="classical-rule-logic-nnc-constituent-analysis" data-classical-rule-logic-control="nnc-constituent-analysis">
                          <option value="select" data-classical-authority-option-tag="cn-option-nnc-constituent-analysis-select">select analysis</option>
                          <option value="current-typed-slots" data-classical-authority-option-tag="cn-option-nnc-constituent-analysis-current" selected>current typed slots</option>
                          <option value="alternative-typed-slots" data-classical-authority-option-tag="cn-option-nnc-constituent-analysis-alternative">alternative typed slots</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="lexical" data-classical-nnc-authority-order="lexical-possessive-formation" hidden>
                        <span class="classical-rule-control__label">Possessive formation</span>
                        <select id="classical-rule-logic-nnc-possessive-formation" data-classical-rule-logic-control="nnc-possessive-formation">
                          <option value="regular" data-classical-authority-option-tag="cn-option-nnc-possessive-formation-regular" selected>regular possessive stem</option>
                          <option value="suppletive" data-classical-authority-option-tag="cn-option-nnc-possessive-formation-suppletive">suppletive stem</option>
                          <option value="secondary-general-use" data-classical-authority-option-tag="cn-option-nnc-possessive-formation-secondary">secondary general-use stem</option>
                          <option value="analogical-restricted-use" data-classical-authority-option-tag="cn-option-nnc-possessive-formation-analogical">analogical tla restricted-use stem</option>
                          <option value="tl-2a-to-1a" data-classical-authority-option-tag="cn-option-nnc-possessive-formation-reclassification">tl 2-A to 1-A reclassification</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="lexical" data-classical-nnc-authority-order="lexical-lesson15-target-stem" hidden>
                        <span class="classical-rule-control__label">Selected lexical stem</span>
                        <input id="classical-rule-logic-nnc-lesson15-target-stem" type="text" autocomplete="off" spellcheck="false" placeholder="exact stem, including macrons" data-classical-rule-logic-control="nnc-lesson15-target-stem">
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="lexical" data-classical-nnc-authority-order="lexical-suppletive-connector" hidden>
                        <span class="classical-rule-control__label">Suppletive connector</span>
                        <select id="classical-rule-logic-nnc-suppletive-connector" data-classical-rule-logic-control="nnc-suppletive-connector">
                          <option value="class-governed" data-classical-authority-option-tag="cn-option-nnc-suppletive-connector-class" selected>keep class-governed connector</option>
                          <option value="uh" data-classical-authority-option-tag="cn-option-nnc-suppletive-connector-uh">uh-0</option>
                          <option value="hui" data-classical-authority-option-tag="cn-option-nnc-suppletive-connector-hui">hui-0</option>
                          <option value="0" data-classical-authority-option-tag="cn-option-nnc-suppletive-connector-zero">0-0</option>
                          <option value="⎕" data-classical-authority-option-tag="cn-option-nnc-suppletive-connector-silent">⎕-0</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="lexical" data-classical-nnc-authority-order="lexical-secondary-carrier" hidden>
                        <span class="classical-rule-control__label">Inner possessor carrier</span>
                        <select id="classical-rule-logic-nnc-secondary-carrier" data-classical-rule-logic-control="nnc-secondary-carrier">
                          <option value="tē" data-classical-authority-option-tag="cn-option-nnc-secondary-carrier-te-long" selected>tē</option>
                          <option value="ti" data-classical-authority-option-tag="cn-option-nnc-secondary-carrier-ti">ti</option>
                          <option value="t" data-classical-authority-option-tag="cn-option-nnc-secondary-carrier-t">t</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="ordinary" data-classical-nnc-authority-order="predicate-class" hidden>
                        <span class="classical-rule-control__label">Noun class</span>
                        <select id="classical-rule-logic-nnc-class" data-classical-rule-logic-control="nnc-class">
                          <option value="tl" data-classical-authority-option-tag="cn-option-nnc-class-tl" selected>tl</option>
                          <option value="tli" data-classical-authority-option-tag="cn-option-nnc-class-tli">tli / li</option>
                          <option value="in" data-classical-authority-option-tag="cn-option-nnc-class-in">in</option>
                          <option value="zero" data-classical-authority-option-tag="cn-option-nnc-class-zero">0</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="ordinary" data-classical-nnc-authority-order="predicate-stem-relation" hidden>
                        <span class="classical-rule-control__label">Stem relation</span>
                        <select id="classical-rule-logic-nnc-stem-relation" data-classical-rule-logic-control="nnc-stem-relation">
                          <option value="plain" data-classical-authority-option-tag="cn-option-nnc-stem-relation-plain" selected>plain</option>
                          <option value="affinity" data-classical-authority-option-tag="cn-option-nnc-stem-relation-affinity">affinity</option>
                          <option value="distributive-varietal" data-classical-authority-option-tag="cn-option-nnc-stem-relation-distributive-varietal">distributive / varietal</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="possessive" data-classical-nnc-authority-order="predicate-possessor" hidden>
                        <span class="classical-rule-control__label">Possessor</span>
                        <select id="classical-rule-logic-nnc-possessor" data-classical-rule-logic-control="nnc-possessor">
                          <option value="reciprocal" data-classical-authority-option-tag="cn-option-nnc-possessor-reciprocal">reciprocal ne</option>
                          <option value="te" data-classical-authority-option-tag="cn-option-nnc-possessor-te">nonspecific human tē</option>
                          <option value="tla" data-classical-authority-option-tag="cn-option-nnc-possessor-tla">nonspecific nonhuman tla</option>
                          <option value="1sg" data-classical-authority-option-tag="cn-option-nnc-possessor-1sg">1sg</option>
                          <option value="2sg" data-classical-authority-option-tag="cn-option-nnc-possessor-2sg">2sg</option>
                          <option value="3sg" data-classical-authority-option-tag="cn-option-nnc-possessor-3sg" selected>3sg</option>
                          <option value="1pl" data-classical-authority-option-tag="cn-option-nnc-possessor-1pl">1pl</option>
                          <option value="2pl" data-classical-authority-option-tag="cn-option-nnc-possessor-2pl">2pl</option>
                          <option value="3pl" data-classical-authority-option-tag="cn-option-nnc-possessor-3pl">3pl</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="lexical" data-classical-nnc-authority-order="lexical-third-plural-source" hidden>
                        <span class="classical-rule-control__label">Available 3pl possessor forms</span>
                        <select id="classical-rule-logic-nnc-third-plural-source-options" data-classical-rule-logic-control="nnc-third-plural-source-options">
                          <option value="m" data-classical-authority-option-tag="cn-option-nnc-third-plural-source-m">m only</option>
                          <option value="n" data-classical-authority-option-tag="cn-option-nnc-third-plural-source-n">n only</option>
                          <option value="m-n" data-classical-authority-option-tag="cn-option-nnc-third-plural-source-m-n" selected>m or n</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="possessive" data-classical-nnc-authority-order="predicate-third-plural-form" hidden>
                        <span class="classical-rule-control__label">Third-plural possessor form</span>
                        <select id="classical-rule-logic-nnc-third-plural-form" data-classical-rule-logic-control="nnc-third-plural-form">
                          <option value="select" data-classical-authority-option-tag="cn-option-nnc-third-plural-form-select" selected>select m or n</option>
                          <option value="m" data-classical-authority-option-tag="cn-option-nnc-third-plural-form-m">m</option>
                          <option value="n" data-classical-authority-option-tag="cn-option-nnc-third-plural-form-n">n</option>
                        </select>
                      </label>
                      <label class="classical-rule-control classical-rule-control--checkbox" data-classical-nnc-authority-control="possessive" data-classical-nnc-authority-order="predicate-possessor-reduplication" hidden>
                        <span class="classical-rule-control__label">Reduplicate possessor</span>
                        <input
                          type="checkbox"
                          id="classical-rule-logic-nnc-possessor-reduplication"
                          value="reduplicated"
                          data-classical-rule-logic-control="nnc-possessor-reduplication"
                          data-classical-checked-value="reduplicated"
                          data-classical-unchecked-value="single"
                          data-classical-checked-authority-option-tag="cn-option-nnc-possessor-reduplication-enabled"
                          data-classical-unchecked-authority-option-tag="cn-option-nnc-possessor-reduplication-disabled"
                        />
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="possessive" data-classical-nnc-authority-order="predicate-use-stem" hidden>
                        <span class="classical-rule-control__label">Use stem</span>
                        <select id="classical-rule-logic-nnc-use-shape" data-classical-rule-logic-control="nnc-use-shape">
                          <option value="base" data-classical-authority-option-tag="cn-option-nnc-use-base" selected>base</option>
                          <option value="truncated-a" data-classical-authority-option-tag="cn-option-nnc-use-truncated-a">remove ephemeral a</option>
                          <option value="truncated-i" data-classical-authority-option-tag="cn-option-nnc-use-truncated-i">remove ephemeral i</option>
                          <option value="truncated-a-supportive-i" data-classical-authority-option-tag="cn-option-nnc-use-truncated-a-supportive-i">remove a + supportive i</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="possessive" data-classical-nnc-authority-order="predicate-subclass" hidden>
                        <span class="classical-rule-control__label">Subclass</span>
                        <select id="classical-rule-logic-nnc-subclass" data-classical-rule-logic-control="nnc-subclass">
                          <option value="tl-1a" data-classical-authority-option-tag="cn-option-nnc-subclass-tl-1a" selected>tl 1-A</option>
                          <option value="tl-1b" data-classical-authority-option-tag="cn-option-nnc-subclass-tl-1b">tl 1-B</option>
                          <option value="tl-2a" data-classical-authority-option-tag="cn-option-nnc-subclass-tl-2a">tl 2-A</option>
                          <option value="tl-2b" data-classical-authority-option-tag="cn-option-nnc-subclass-tl-2b">tl 2-B</option>
                          <option value="tl-2c" data-classical-authority-option-tag="cn-option-nnc-subclass-tl-2c">tl 2-C</option>
                          <option value="tli-1" data-classical-authority-option-tag="cn-option-nnc-subclass-tli-1">tli 1</option>
                          <option value="tli-2" data-classical-authority-option-tag="cn-option-nnc-subclass-tli-2">tli 2</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="number" data-classical-nnc-authority-order="subject-number-form" hidden>
                        <span class="classical-rule-control__label">Number form</span>
                        <select id="classical-rule-logic-nnc-number-form" data-classical-rule-logic-control="nnc-number-form">
                          <option value="sounded" data-classical-authority-option-tag="cn-option-nnc-number-sounded">sounded</option>
                          <option value="t-in" data-classical-authority-option-tag="cn-option-nnc-number-t-in" selected>t-in</option>
                          <option value="m-eh" data-classical-authority-option-tag="cn-option-nnc-number-m-eh">m-eh</option>
                          <option value="0-h" data-classical-authority-option-tag="cn-option-nnc-number-zero-h">0-h</option>
                          <option value="silent-silent" data-classical-authority-option-tag="cn-option-nnc-number-silent">silent</option>
                        </select>
                      </label>
                      <label class="classical-rule-control classical-rule-control--internal-mirror" data-classical-nnc-authority-control="referent-mirror" data-classical-authority-internal-mirror="nnc-subject-animacy" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Legacy referent state</span>
                        <select id="classical-rule-logic-nnc-referent" data-classical-rule-logic-control="nnc-referent">
                          <option value="animate" data-classical-authority-option-tag="cn-option-nnc-referent-animate" selected>animate</option>
                          <option value="nonanimate" data-classical-authority-option-tag="cn-option-nnc-referent-nonanimate">nonanimate</option>
                          <option value="metaphorical" data-classical-authority-option-tag="cn-option-nnc-referent-metaphorical">metaphorical animate</option>
                        </select>
                      </label>
                      <label class="classical-rule-control classical-rule-control--checkbox" data-classical-nnc-authority-control="ordinary" data-classical-nnc-authority-order="subject-metaphorical-use" hidden>
                        <span class="classical-rule-control__label">Metaphorical use</span>
                        <input
                          type="checkbox"
                          id="classical-rule-logic-nnc-metaphorical-use"
                          value="metaphorical"
                          data-classical-rule-logic-control="nnc-metaphorical-use"
                          data-classical-checked-value="metaphorical"
                          data-classical-unchecked-value="literal"
                          data-classical-checked-authority-option-tag="cn-option-nnc-metaphorical-enabled"
                          data-classical-unchecked-authority-option-tag="cn-option-nnc-metaphorical-disabled"
                        />
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="quantitive" data-classical-nnc-authority-order="predicate-quantitive-family" hidden>
                        <span class="classical-rule-control__label">Matrix family</span>
                        <select id="classical-rule-logic-nnc-quantitive-matrix" data-classical-rule-logic-control="nnc-quantitive-matrix">
                          <option value="quich" data-classical-authority-option-tag="cn-option-nnc-matrix-quich">qui-ch</option>
                          <option value="qui" data-classical-authority-option-tag="cn-option-nnc-matrix-qui" selected>quī</option>
                          <option value="chi" data-classical-authority-option-tag="cn-option-nnc-matrix-chi">chī</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="quantitive" data-classical-nnc-authority-order="predicate-quantitive-form" hidden>
                        <span class="classical-rule-control__label">Matrix form</span>
                        <select id="classical-rule-logic-nnc-quantitive-matrix-form" data-classical-rule-logic-control="nnc-quantitive-matrix-form">
                          <option value="qui-ch" data-classical-authority-option-tag="cn-option-nnc-matrix-form-qui-ch">qui-ch</option>
                          <option value="quī" data-classical-authority-option-tag="cn-option-nnc-matrix-form-qui-long">quī</option>
                          <option value="quih" data-classical-authority-option-tag="cn-option-nnc-matrix-form-quih">quih</option>
                          <option value="qui" data-classical-authority-option-tag="cn-option-nnc-matrix-form-qui" selected>qui</option>
                          <option value="c" data-classical-authority-option-tag="cn-option-nnc-matrix-form-c">c</option>
                          <option value="chī" data-classical-authority-option-tag="cn-option-nnc-matrix-form-chi-long">chī</option>
                          <option value="chih" data-classical-authority-option-tag="cn-option-nnc-matrix-form-chih">chih</option>
                          <option value="chi" data-classical-authority-option-tag="cn-option-nnc-matrix-form-chi">chi</option>
                          <option value="ch" data-classical-authority-option-tag="cn-option-nnc-matrix-form-ch">ch</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="quantitive" data-classical-nnc-authority-order="predicate-quantitive-pluralization" hidden>
                        <span class="classical-rule-control__label">Predicate pluralization</span>
                        <select id="classical-rule-logic-nnc-quantitive-predicate-pluralization" data-classical-rule-logic-control="nnc-quantitive-predicate-pluralization">
                          <option value="not-applicable" data-classical-authority-option-tag="cn-option-nnc-quantitive-plural-na" selected>not applicable</option>
                          <option value="plain-qui-ch" data-classical-authority-option-tag="cn-option-nnc-quantitive-plural-quich">plain qui-ch</option>
                          <option value="internal-n" data-classical-authority-option-tag="cn-option-nnc-quantitive-plural-internal-n">internal n</option>
                          <option value="plain-variant" data-classical-authority-option-tag="cn-option-nnc-quantitive-plural-plain">lexically authorized plain variant</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-mood">
                        <span class="classical-rule-control__label">Mood</span>
                        <select
                          id="classical-rule-logic-mood"
                          data-classical-rule-logic-control="mood"
                        >
                          <option value="indicative" data-classical-authority-option-tag="cn-option-mood-indicative" selected>indicative</option>
                          <option value="optative" data-classical-authority-option-tag="cn-option-mood-optative">optative</option>
                          <option value="admonitive" data-classical-authority-option-tag="cn-option-mood-admonitive">admonitive</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-tense">
                        <span class="classical-rule-control__label">Tense</span>
                        <select
                          id="classical-rule-logic-tense"
                          data-classical-rule-logic-control="tense"
                        >
                          <option value="present" data-classical-authority-option-tag="cn-option-tense-present" selected>present</option>
                          <option value="preterit" data-classical-authority-option-tag="cn-option-tense-preterit">preterit</option>
                          <option value="future" data-classical-authority-option-tag="cn-option-tense-future">future</option>
                          <option value="distant-past" data-classical-authority-option-tag="cn-option-tense-distant-past">distant past</option>
                          <option value="general-past" data-classical-authority-option-tag="cn-option-tense-general-past">general past</option>
                          <option value="customary-present" data-classical-authority-option-tag="cn-option-tense-customary-present">customary present</option>
                          <option value="imperfect" data-classical-authority-option-tag="cn-option-tense-imperfect">imperfect</option>
                          <option value="nonpast" data-classical-authority-option-tag="cn-option-tense-nonpast">nonpast</option>
                          <option value="past" data-classical-authority-option-tag="cn-option-tense-past">past</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-class">
                        <span class="classical-rule-control__label">Class</span>
                        <select
                          id="classical-rule-logic-class"
                          data-classical-rule-logic-control="class"
                        >
                          <option value="A" data-classical-authority-option-tag="cn-option-class-a">A</option>
                          <option value="B" data-classical-authority-option-tag="cn-option-class-b" selected>B</option>
                          <option value="C" data-classical-authority-option-tag="cn-option-class-c">C</option>
                          <option value="D" data-classical-authority-option-tag="cn-option-class-d">D</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-derivation-option" data-classical-derivation-authority-control="formation" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Generated formation</span>
                        <select
                          id="classical-rule-logic-derivation-option"
                          data-classical-rule-logic-control="derivation-option"
                        >
                          <option value="" data-classical-authority-option-tag="cn-option-vnc-derivation-generated-choice-required" data-classical-authority-option-status="engine-options-pending" selected>Choose a generated formation</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-causative-source-voice" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Source voice</span>
                        <select
                          id="classical-rule-logic-causative-source-voice"
                          data-classical-rule-logic-control="causative-source-voice"
                          aria-description="Voice of the VNC consumed by the causative; distinct from later target voice"
                        >
                          <option value="active" data-classical-authority-option-tag="cn-option-causative-source-voice-active" selected>active source</option>
                          <option value="passive" data-classical-authority-option-tag="cn-option-causative-source-voice-passive">passive source</option>
                          <option value="impersonal" data-classical-authority-option-tag="cn-option-causative-source-voice-impersonal">impersonal source</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-causative-source-nonactive" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Source nonactive formation</span>
                        <select
                          id="classical-rule-logic-causative-source-nonactive"
                          data-classical-rule-logic-control="causative-source-nonactive"
                        >
                          <option value="" data-classical-authority-option-tag="cn-option-causative-source-nonactive-generated-choice-required" data-classical-authority-option-status="explicit-choice-required" selected>Choose a generated source formation</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-causative-source-subject" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Embedded subject</span>
                        <select
                          id="classical-rule-logic-causative-source-subject"
                          data-classical-rule-logic-control="causative-source-subject"
                        >
                          <option value="1sg" data-classical-authority-option-tag="cn-option-causative-source-subject-1sg">1sg</option>
                          <option value="2sg" data-classical-authority-option-tag="cn-option-causative-source-subject-2sg">2sg</option>
                          <option value="3sg" data-classical-authority-option-tag="cn-option-causative-source-subject-3sg" selected>3sg</option>
                          <option value="1pl" data-classical-authority-option-tag="cn-option-causative-source-subject-1pl">1pl</option>
                          <option value="2pl" data-classical-authority-option-tag="cn-option-causative-source-subject-2pl">2pl</option>
                          <option value="3pl" data-classical-authority-option-tag="cn-option-causative-source-subject-3pl">3pl</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-causative-participant-choice" data-classical-derivation-authority-control="participant" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Referent relation</span>
                        <select
                          id="classical-rule-logic-causative-referent-relation"
                          data-classical-rule-logic-control="causative-referent-relation"
                        >
                          <option value="" data-classical-authority-option-tag="cn-option-causative-referent-relation-required" disabled selected>Choose distinct or coreferential</option>
                          <option value="distinct" data-classical-authority-option-tag="cn-option-causative-referent-relation-distinct">distinct referents</option>
                          <option value="coreferential" data-classical-authority-option-tag="cn-option-causative-referent-relation-coreferential">coreferential</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-causative-participant-choice" data-classical-derivation-authority-control="participant" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Specific shuntline object</span>
                        <select
                          id="classical-rule-logic-causative-specific-shuntline-realization"
                          data-classical-rule-logic-control="causative-specific-shuntline-realization"
                        >
                          <option value="silent" data-classical-authority-option-tag="cn-option-causative-specific-shuntline-silent" selected>silent · general practice</option>
                          <option value="sounded" data-classical-authority-option-tag="cn-option-causative-specific-shuntline-sounded">sounded · writer variant</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-applicative-object" data-classical-derivation-authority-control="participant" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Imported object</span>
                        <select
                          id="classical-rule-logic-applicative-object"
                          data-classical-rule-logic-control="applicative-object"
                        >
                          <option value="specific-projective:1sg" data-classical-authority-option-tag="cn-option-applicative-object-specific-1sg">specific 1sg</option>
                          <option value="specific-projective:2sg" data-classical-authority-option-tag="cn-option-applicative-object-specific-2sg">specific 2sg</option>
                          <option value="specific-projective:3sg" data-classical-authority-option-tag="cn-option-applicative-object-specific-3sg" selected>specific 3sg</option>
                          <option value="specific-projective:1pl" data-classical-authority-option-tag="cn-option-applicative-object-specific-1pl">specific 1pl</option>
                          <option value="specific-projective:2pl" data-classical-authority-option-tag="cn-option-applicative-object-specific-2pl">specific 2pl</option>
                          <option value="specific-projective:3pl" data-classical-authority-option-tag="cn-option-applicative-object-specific-3pl">specific 3pl</option>
                          <option value="reflexive:" data-classical-authority-option-tag="cn-option-applicative-object-reflexive">reflexive / reciprocal</option>
                          <option value="nonspecific-human:" data-classical-authority-option-tag="cn-option-applicative-object-nonspecific-human">nonspecific human</option>
                          <option value="nonspecific-nonhuman:" data-classical-authority-option-tag="cn-option-applicative-object-nonspecific-nonhuman">nonspecific nonhuman</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-construction" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Construction</span>
                        <select
                          id="classical-rule-logic-construction"
                          data-classical-rule-logic-control="lesson11-construction"
                        >
                          <option value="none" data-classical-authority-option-tag="cn-option-lesson11-construction-none" selected>none</option>
                          <option value="quēn" data-classical-authority-option-tag="cn-option-lesson11-construction-quen">quēn</option>
                          <option value="quēn-mach" data-classical-authority-option-tag="cn-option-lesson11-construction-quen-mach">quēn mach</option>
                          <option value="incorporated-quēn" data-classical-authority-option-tag="cn-option-lesson11-construction-incorporated-quen">incorporated quēn</option>
                          <option value="pronominal-nnc" data-classical-authority-option-tag="cn-option-lesson11-construction-pronominal-nnc">pronominal NNC</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-reading" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Reading</span>
                        <select
                          id="classical-rule-logic-lexical-reading"
                          data-classical-rule-logic-control="lesson11-lexical-reading"
                        >
                          <option value="unspecified" data-classical-authority-option-tag="cn-option-lesson11-reading-unspecified" selected>choose reading</option>
                          <option value="alert-observant" data-classical-authority-option-tag="cn-option-lesson11-reading-alert">alert / observant</option>
                          <option value="motion" data-classical-authority-option-tag="cn-option-lesson11-reading-motion">come / go</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-voice" data-classical-derivation-authority-control="finalizer">
                        <span class="classical-rule-control__label">Later target voice</span>
                        <select
                          id="classical-rule-logic-vnc-voice"
                          data-classical-rule-logic-control="vnc-voice"
                          aria-description="Voice applied after the causative or applicative is complete"
                        >
                          <option value="active" data-classical-authority-option-tag="cn-option-vnc-voice-active" selected>active</option>
                          <option value="passive" data-classical-authority-option-tag="cn-option-vnc-voice-passive">passive</option>
                          <option value="impersonal" data-classical-authority-option-tag="cn-option-vnc-voice-impersonal">impersonal</option>
                          <option value="inherent-impersonal" data-classical-authority-option-tag="cn-option-vnc-voice-inherent-impersonal">inherently impersonal</option>
                          <option value="tla-impersonal" data-classical-authority-option-tag="cn-option-vnc-voice-tla-impersonal">tla-impersonal</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-voice-layer-2" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Next voice layer</span>
                        <select
                          id="classical-rule-logic-voice-layer-2"
                          data-classical-rule-logic-control="voice-layer-2"
                        >
                          <option value="" data-classical-authority-option-tag="cn-option-ordered-voice-keep-inherent" selected>keep inherently impersonal</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-voice-layer-3" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Following voice layer</span>
                        <select
                          id="classical-rule-logic-voice-layer-3"
                          data-classical-rule-logic-control="voice-layer-3"
                        >
                          <option value="" data-classical-authority-option-tag="cn-option-ordered-voice-keep-tla" selected>keep tla-impersonal</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-nonactive-family" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Nonactive formation</span>
                        <select
                          id="classical-rule-logic-nonactive-family"
                          data-classical-rule-logic-control="nonactive-family"
                        >
                          <option value="" data-classical-authority-option-tag="cn-option-nonactive-generated-choice-required" data-classical-authority-option-status="explicit-choice-required" selected>Choose a generated formation</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-valence">
                        <span class="classical-rule-control__label">Valence</span>
                        <select
                          id="classical-rule-logic-valence"
                          data-classical-rule-logic-control="valence"
                        >
                          <option value="intransitive" data-classical-authority-option-tag="cn-option-valence-intransitive" selected>intransitive</option>
                          <option value="shuntline-reflexive" data-classical-authority-option-tag="cn-option-valence-shuntline-reflexive">va ne secondary reflexive/reciprocal</option>
                          <option value="projective-human" data-classical-authority-option-tag="cn-option-valence-projective-human">va te nonspecific human projective</option>
                          <option value="projective-nonhuman" data-classical-authority-option-tag="cn-option-valence-projective-nonhuman-tla">va tla nonspecific nonhuman projective</option>
                          <option value="specific-projective" data-classical-authority-option-tag="cn-option-valence-specific-projective">va1-va2 specific projective</option>
                          <option value="mainline-reflexive" data-classical-authority-option-tag="cn-option-valence-mainline-reflexive">va1-va2 mainline reflexive/reciprocal</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-object">
                        <span class="classical-rule-control__label">Object</span>
                        <select
                          id="classical-rule-logic-object"
                          data-classical-rule-logic-control="object"
                        >
                          <option value="specific-projective:1sg" data-classical-authority-option-tag="cn-option-object-specific-1sg">specific 1sg</option>
                          <option value="specific-projective:2sg" data-classical-authority-option-tag="cn-option-object-specific-2sg">specific 2sg</option>
                          <option value="specific-projective:3sg" data-classical-authority-option-tag="cn-option-object-specific-3sg" selected>specific 3sg</option>
                          <option value="specific-projective:1pl" data-classical-authority-option-tag="cn-option-object-specific-1pl">specific 1pl</option>
                          <option value="specific-projective:2pl" data-classical-authority-option-tag="cn-option-object-specific-2pl">specific 2pl</option>
                          <option value="specific-projective:3pl" data-classical-authority-option-tag="cn-option-object-specific-3pl">specific 3pl</option>
                        </select>
                      </label>
                      <label class="classical-rule-control classical-rule-control--checkbox" data-classical-vnc-authority-order="predicate-tla-fusion">
                        <span class="classical-rule-control__label">tla fusion</span>
                        <input
                          type="checkbox"
                          id="classical-rule-logic-tla-fusion"
                          data-classical-rule-logic-control="tla-fusion"
                          data-classical-authority-option-tag="cn-option-tla-fusion-enabled"
                        />
                      </label>
                      <label
                        class="classical-rule-control"
                        data-classical-vnc-authority-order="predicate-directional"
                      >
                        <span class="classical-rule-control__label">Directional / locative</span>
                        <select
                          id="classical-rule-logic-directional"
                          data-classical-rule-logic-control="directional-locative"
                          data-classical-result-scope="vnc-internal-prefix"
                        >
                          <option value="none" data-classical-authority-option-tag="cn-option-directional-none" selected>none</option>
                          <option value="on" data-classical-authority-option-tag="cn-option-directional-on">on distance/thither</option>
                          <option value="huāl" data-classical-authority-option-tag="cn-option-directional-hual">huāl proximity/hither</option>
                        </select>
                      </label>
                      <label
                        class="classical-rule-control classical-rule-control--checkbox classical-rule-control--result-surface"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-vnc-authority-order="sentence-antecessive"
                      >
                        <span class="classical-rule-control__label">Antecessive ō#</span>
                        <input
                          type="checkbox"
                          id="classical-rule-logic-prefix-stack"
                          value="antecessive"
                          data-classical-rule-logic-control="prefix-stack"
                          data-classical-result-scope="sentence-prefix-stack"
                          data-classical-checked-value="antecessive"
                          data-classical-unchecked-value="none"
                          data-classical-checked-authority-option-tag="cn-option-prefix-stack-antecessive"
                          data-classical-unchecked-authority-option-tag="cn-option-prefix-stack-none"
                        />
                      </label>
                      <div
                        class="classical-rule-control classical-rule-control--result-surface classical-rule-control--segmented"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-nnc-authority-order="sentence-polarity"
                        data-classical-vnc-authority-order="sentence-polarity"
                      >
                        <span class="classical-rule-control__label">Polarity</span>
                        <input
                          type="hidden"
                          id="classical-rule-logic-polarity"
                          value="positive"
                          data-classical-rule-logic-control="polarity"
                          data-classical-result-scope="sentence-polarity"
                        />
                        <div class="classical-segmented-control" role="group" aria-label="Polarity">
                          <button
                            type="button"
                            class="classical-segmented-control__option is-active"
                            data-classical-segment-control="classical-rule-logic-polarity"
                            data-classical-segment-value="positive"
                            data-classical-authority-option-tag="cn-option-polarity-positive"
                            aria-pressed="true"
                          >Positive</button>
                          <button
                            type="button"
                            class="classical-segmented-control__option"
                            data-classical-segment-control="classical-rule-logic-polarity"
                            data-classical-segment-value="negative"
                            data-classical-authority-option-tag="cn-option-polarity-negative"
                            aria-pressed="false"
                          >Negative</button>
                        </div>
                      </div>
                      <label
                        class="classical-rule-control classical-rule-control--result-surface"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-nnc-authority-order="sentence-type"
                        data-classical-vnc-authority-order="sentence-type"
                      >
                        <span class="classical-rule-control__label">Sentence type</span>
                        <select
                          id="classical-rule-logic-sentence-surface"
                          data-classical-rule-logic-control="sentence-surface"
                          data-classical-result-scope="sentence-surface"
                        >
                          <option value="statement" data-classical-authority-option-tag="cn-option-sentence-surface-statement" selected>statement</option>
                          <option value="emphatic" data-classical-authority-option-tag="cn-option-sentence-surface-emphatic-ca">emphatic</option>
                          <option value="question-intonation" data-classical-authority-option-tag="cn-option-sentence-surface-question-intonation">question: intonation</option>
                          <option value="question-cuix" data-classical-authority-option-tag="cn-option-sentence-surface-question-cuix">question: cuix</option>
                          <option value="information-question" data-classical-authority-option-tag="cn-option-sentence-surface-information-question">information question</option>
                          <option value="wish" data-classical-authority-option-tag="cn-option-sentence-surface-wish">wish</option>
                        </select>
                      </label>
                      <label
                        class="classical-rule-control classical-rule-control--result-surface"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-vnc-authority-order="sentence-introductory"
                      >
                        <span class="classical-rule-control__label">Introductory particle</span>
                        <select
                          id="classical-rule-logic-introductory-particle"
                          data-classical-rule-logic-control="introductory-particle"
                          data-classical-result-scope="sentence-introductory-particle"
                        >
                          <option value="none" data-classical-authority-option-tag="cn-option-sentence-introductory-none" selected>none</option>
                          <option value="mā" data-classical-authority-option-tag="cn-option-sentence-introductory-ma">mā</option>
                          <option value="tlā" data-classical-authority-option-tag="cn-option-sentence-introductory-tla">tlā</option>
                        </select>
                      </label>
                      <label
                        class="classical-rule-control classical-rule-control--result-surface"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-vnc-authority-order="sentence-before-introductory"
                      >
                        <span class="classical-rule-control__label">Before introductory</span>
                        <select
                          id="classical-rule-logic-preface-particle"
                          data-classical-rule-logic-control="preface-particle"
                          data-classical-result-scope="lesson9-preface-particle"
                        >
                          <option value="none" data-classical-authority-option-tag="cn-option-sentence-preface-none" selected>none</option>
                          <option value="ihyo" data-classical-authority-option-tag="cn-option-sentence-preface-ihyo">ihyo</option>
                          <option value="ye" data-classical-authority-option-tag="cn-option-sentence-preface-ye">ye</option>
                        </select>
                      </label>
                      <label
                        class="classical-rule-control classical-rule-control--result-surface"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-vnc-authority-order="sentence-after-introductory"
                      >
                        <span class="classical-rule-control__label">After introductory</span>
                        <select
                          id="classical-rule-logic-introductory-modifier"
                          data-classical-rule-logic-control="introductory-modifier"
                          data-classical-result-scope="lesson9-introductory-modifier"
                        >
                          <option value="none" data-classical-authority-option-tag="cn-option-sentence-introductory-modifier-none" selected>none</option>
                          <option value="cuēl" data-classical-authority-option-tag="cn-option-sentence-introductory-modifier-cuel">cuēl</option>
                          <option value="ye-cuēl" data-classical-authority-option-tag="cn-option-sentence-introductory-modifier-ye-cuel">ye cuēl</option>
                          <option value="cuēl-eh" data-classical-authority-option-tag="cn-option-sentence-introductory-modifier-cuel-eh">cuēl eh</option>
                          <option value="ye-cuēl-eh" data-classical-authority-option-tag="cn-option-sentence-introductory-modifier-ye-cuel-eh">ye cuēl eh</option>
                          <option value="tēl" data-classical-authority-option-tag="cn-option-sentence-introductory-modifier-tel">tēl</option>
                          <option value="quin" data-classical-authority-option-tag="cn-option-sentence-introductory-modifier-quin">quin</option>
                          <option value="nēn" data-classical-authority-option-tag="cn-option-sentence-introductory-modifier-nen">nēn</option>
                        </select>
                      </label>
                    </div>
                  </section>
                </div>
                <div
                  id="tense-tabs"
                  class="tense-tabs formula-slot-controls"
                  data-andrews-section="4.4-4.5"
                  data-andrews-formula-role="predicate-inflection"
                  data-andrews-vnc-slot="tns"
                  data-andrews-nnc-slot="st"
                  data-classical-internal-scaffold="legacy-tense-tabs-runtime-mirror"
                  data-classical-source-authorizes="none"
                ></div>
              </section>
    `;
    }
    function ClassicalResultPanel() {
      return `          <section
                class="panel container-tense-grid nuclear-clause-output-panel panel-stack-pane"
                id="container-tense-grid"
                data-panel-stack-pane="output"
                data-andrews-stage="authorized-result"
                data-andrews-stage-label="3 Authorized Result"
                data-andrews-panel="#3-authorized-result"
                data-andrews-panel-role="authorized-result"
                data-andrews-section="4.3-4.5"
                data-andrews-renders="subject-predicate-formula"
                role="tabpanel"
                aria-labelledby="panel-stack-tab-output"
              >
              <div class="panel-block-title">
                <button
                  type="button"
                  class="panel-pane-nav-btn panel-pane-nav-btn--prev"
                  data-pane-nav-from="output"
                  data-pane-nav-direction="prev"
                  aria-label="Go to previous panel"
                  title="Previous panel"
                >
                  <span aria-hidden="true">◀</span>
                </button>
                <span class="panel-block-step">3</span>
                <span class="panel-block-text">RESULT</span>
                <button
                  type="button"
                  class="panel-pane-nav-btn panel-pane-nav-btn--next"
                  data-pane-nav-from="output"
                  data-pane-nav-direction="next"
                  aria-label="Go to next panel"
                  title="Next panel"
                >
                  <span aria-hidden="true">▶</span>
                </button>
                <div class="panel-block-actions">
                  <div
                    class="verb-source-scope-control is-hidden"
                    id="verb-source-scope-control"
                    role="group"
                    aria-label="Visible voice"
                    aria-hidden="true"
                    hidden
                  >
                    <div class="verb-source-scope-buttons">
                      <button
                        type="button"
                        class="verb-source-scope-button"
                        id="verb-source-scope-both"
                        data-verb-source-scope="both"
                        data-ui-label-key="verb-source-scope-both"
                        aria-pressed="true"
                      >All</button>
                      <button
                        type="button"
                        class="verb-source-scope-button"
                        id="verb-source-scope-active"
                        data-verb-source-scope="active"
                        data-ui-label-key="verb-source-scope-active"
                        aria-pressed="false"
                      >Active</button>
                      <button
                        type="button"
                        class="verb-source-scope-button"
                        id="verb-source-scope-nonactive"
                        data-verb-source-scope="nonactive"
                        data-ui-label-key="verb-source-scope-nonactive"
                        aria-pressed="false"
                      >Nonactive</button>
                    </div>
                  </div>
                  <button type="button" class="view-export-button panel-action-button" id="view-export-csv">
                    <span class="panel-action-button__icon" aria-hidden="true">
                      <svg viewBox="0 0 16 16" focusable="false">
                        <path
                          d="M2.5 1.5h7l4 4v9H2.5zM9.5 1.5v4h4M8 6.5v6m0 0-2-2m2 2 2-2"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.35"
                        />
                      </svg>
                    </span>
                    <span class="panel-action-button__label">Data view</span>
                  </button>
                  <button
                    type="button"
                    class="view-export-button panel-action-button"
                    id="view-export-slot-strip-csv"
                    aria-label="Download visible strips"
                    title="Download visible strips"
                  >
                    <span class="panel-action-button__icon" aria-hidden="true">
                      <svg viewBox="0 0 16 16" focusable="false">
                        <path
                          d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11M4.5 3.25v2.5M8 6.75v2.5M11.5 10.25v2.5"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.35"
                        />
                      </svg>
                    </span>
                    <span class="panel-action-button__label">Visible strips</span>
                  </button>
                  <button
                    type="button"
                    class="view-export-button calc-toggle-lock-chip panel-action-button"
                    id="calc-toggle-lock-button"
                    aria-pressed="false"
                  >
                    <span
                      class="panel-action-button__icon panel-action-button__icon--lock-open"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 16 16" focusable="false">
                        <path
                          d="M3 7.5h8a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1Z"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.35"
                        />
                        <path
                          d="M5.5 7.5V5.6a2.7 2.7 0 0 1 4.6-1.9"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.35"
                        />
                        <path
                          d="M10.1 3.7 12 5.6"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.35"
                        />
                      </svg>
                    </span>
                    <span
                      class="panel-action-button__icon panel-action-button__icon--lock-closed"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 16 16" focusable="false">
                        <path
                          d="M5 7V5.5a3 3 0 1 1 6 0V7M3 7h10a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.35"
                        />
                      </svg>
                    </span>
                    <span class="panel-action-button__label">Unlocked</span>
                  </button>
                </div>
              </div>
              <div class="output-meta-strip">
                <div class="calc-summary" id="calc-summary" aria-live="polite"></div>
                <details class="tense-description" id="tense-description" aria-live="polite">
                  <summary class="tense-description__summary">
                    <span class="tense-description__summary-title">Description</span>
                    <span class="tense-description__summary-value"></span>
                  </summary>
                  <div class="tense-description__body"></div>
                </details>
              </div>
              <div
                class="output-journey-strip"
                id="output-journey-strip"
                data-andrews-output-role="route-journey"
                aria-live="polite"
                hidden
              ></div>
              <div class="output-result-controls" id="output-result-controls">
                <div
                  id="output-universal-tabs"
                  role="tablist"
                  aria-label="Universal"
                  aria-live="polite"
                ></div>
                <div
                  class="nonactive-tabs is-hidden"
                  id="nonactive-tabs"
                  role="tablist"
                    aria-label="Nonactive derivation"
                ></div>
              </div>
              <div
                class="classical-result-scope-controls"
                data-classical-result-scope-controls="true"
                aria-label="Result scope"
              >
                <label class="classical-rule-control" data-classical-result-scope-control="nnc" hidden>
                  <span class="classical-rule-control__label">Output scope</span>
                  <select id="classical-rule-logic-nnc-output-scope" data-classical-rule-logic-control="nnc-output-scope">
                    <option value="single" data-classical-authority-option-tag="cn-option-nnc-output-single" selected>single form</option>
                    <option value="paradigm" data-classical-authority-option-tag="cn-option-nnc-output-paradigm">full paradigm</option>
                  </select>
                </label>
                <label class="classical-rule-control" data-classical-result-scope-control="vnc" hidden>
                  <span class="classical-rule-control__label">Output scope</span>
                  <select id="classical-rule-logic-vnc-output-scope" data-classical-rule-logic-control="vnc-output-scope">
                    <option value="single" data-classical-authority-option-tag="cn-option-vnc-output-single" selected>single form</option>
                    <option value="paradigm" data-classical-authority-option-tag="cn-option-vnc-output-paradigm">full paradigm</option>
                  </select>
                </label>
              </div>
              <section
                class="classical-rule-surface"
                id="classical-rule-logic-surface"
                data-classical-rule-logic-surface="true"
                data-classical-nahuatl-source-document="ANDREWS_TRANSCRIPTION_CANVAS.md"
                data-classical-fixed-surfaces="stem-input proof witness receipt"
                data-nawat-pipil-system="not-used"
                aria-label="Classical Nahuatl visible rule logic"
                aria-live="polite"
              ></section>
              <div id="all-tense-conjugations"></div>
              </section>
    `;
    }
    function ClassicalFooter() {
      return `      <footer>
            <p><span id="copyright-label">Copyright © 2026 Jaime Núñez</span></p>
            <p>Thanks to Sigfredo Olmedo</p>
          </footer>
    `;
    }
    function ClassicalTutorialModal() {
      return `    <div class="tutorial-modal" id="tutorial-modal" aria-hidden="true">
          <div class="tutorial-backdrop" data-tutorial-close></div>
          <div class="tutorial-panel" role="dialog" aria-modal="true" aria-labelledby="tutorial-title">
            <div class="tutorial-header">
              <span class="tutorial-eyebrow">Pattern guide</span>
              <h2 id="tutorial-title">How to read the pattern</h2>
              <p class="tutorial-lede">
                The visible pattern is the main language. Read the form from left to right: external pieces, then an intransitive core <code>(...)</code> or transitive core <code>-(...)</code>.
              </p>
              <button type="button" class="tutorial-close" data-tutorial-close aria-label="Close guide">
                ×
              </button>
            </div>
            <div class="tutorial-body">
              <div class="tutorial-grid">
                <div class="tutorial-block tutorial-block--formula">
                  <div class="tutorial-block-title">Base formula</div>
                  <div class="tutorial-chip-row">
                    <span class="tutorial-chip">external + (...) </span>
                    <span class="tutorial-chip-label">when the core is intransitive</span>
                  </div>
                  <div class="tutorial-chip-row">
                    <span class="tutorial-chip">external + -(...) </span>
                    <span class="tutorial-chip-label">when the core is transitive or bitransitive</span>
                  </div>
                  <div class="tutorial-chip-row">
                    <span class="tutorial-chip">(lex)</span>
                    <span class="tutorial-chip-label">external lexical piece; a directional stays outside parentheses</span>
                  </div>
                </div>
                <div class="tutorial-block tutorial-block--symbols">
                  <div class="tutorial-block-title">Symbols</div>
                  <div class="tutorial-chip-row">
                    <span class="tutorial-chip">+</span>
                    <span class="tutorial-chip-label">joins external pieces to each other</span>
                  </div>
                  <div class="tutorial-chip-row">
                    <span class="tutorial-chip">-</span>
                    <span class="tutorial-chip-label">joins internally; before <code>(...)</code> marks a transitive core</span>
                  </div>
                  <div class="tutorial-chip-row">
                    <span class="tutorial-chip">(…)</span>
                    <span class="tutorial-chip-label">intransitive core</span>
                  </div>
                  <div class="tutorial-chip-row">
                    <span class="tutorial-chip">-(…)</span>
                    <span class="tutorial-chip-label">transitive or bitransitive core</span>
                  </div>
                  <div class="tutorial-chip-row">
                    <span class="tutorial-chip">[i] · [y]</span>
                    <span class="tutorial-chip-label">optional support markers</span>
                  </div>
                </div>
                <div class="tutorial-block tutorial-block--patterns">
                  <div class="tutorial-block-title">Common patterns</div>
                  <div class="tutorial-structure">
                    <div class="tutorial-structure-line">
                      <span class="tutorial-code">intransitive core</span>
                      <span class="tutorial-composer-hint"><strong>Composer:</strong> matrix <strong>nemi</strong>.</span>
                      <span class="tutorial-example-inline">
                        <button type="button" class="tutorial-token" data-example="(nemi)">
                          (nemi)
                        </button>
                      </span>
                    </div>
                    <div class="tutorial-structure-line">
                      <span class="tutorial-code">directional + intransitive</span>
                      <span class="tutorial-composer-hint"><strong>Composer:</strong> directional <strong>wal</strong> + matrix <strong>nemi</strong>.</span>
                      <span class="tutorial-example-inline">
                        <button type="button" class="tutorial-token" data-example="wal+(nemi)">
                          wal+(nemi)
                        </button>
                      </span>
                    </div>
                    <div class="tutorial-structure-line">
                      <span class="tutorial-code">external valence + intransitive</span>
                      <span class="tutorial-composer-hint"><strong>Composer:</strong> valence <strong>ta</strong> + matrix <strong>nemi</strong>.</span>
                      <span class="tutorial-example-inline">
                        <button type="button" class="tutorial-token" data-example="ta+(nemi)">
                          ta+(nemi)
                        </button>
                      </span>
                    </div>
                    <div class="tutorial-structure-line">
                      <span class="tutorial-code">transitive with incorporated root</span>
                      <span class="tutorial-composer-hint"><strong>Composer:</strong> incorporated <strong>ish</strong> + matrix <strong>mati</strong>.</span>
                      <span class="tutorial-example-inline">
                        <button type="button" class="tutorial-token" data-example="-(ish-mati)">
                          -(ish-mati)
                        </button>
                      </span>
                    </div>
                    <div class="tutorial-structure-line">
                      <span class="tutorial-code">external lexical + transitive</span>
                      <span class="tutorial-composer-hint"><strong>Composer:</strong> external <strong>shuchi</strong> + matrix <strong>kwi</strong>.</span>
                      <span class="tutorial-example-inline">
                        <button type="button" class="tutorial-token" data-example="(shuchi)-(kwi)">
                          (shuchi)-(kwi)
                        </button>
                      </span>
                    </div>
                    <div class="tutorial-structure-line">
                      <span class="tutorial-code">external lexical + valence + transitive</span>
                      <span class="tutorial-composer-hint"><strong>Composer:</strong> external <strong>a</strong> + valence <strong>ta</strong> + matrix <strong>kwi</strong>.</span>
                      <span class="tutorial-example-inline">
                        <button type="button" class="tutorial-token" data-example="(a)+ta-(kwi)">
                          (a)+ta-(kwi)
                        </button>
                      </span>
                    </div>
                    <div class="tutorial-structure-line">
                      <span class="tutorial-code">bitransitive</span>
                      <span class="tutorial-composer-hint"><strong>Composer:</strong> first <strong>te</strong>, second <strong>ta</strong>, matrix <strong>maka</strong>.</span>
                      <span class="tutorial-example-inline">
                        <button type="button" class="tutorial-token" data-example="te+ta-(maka)">
                          te+ta-(maka)
                        </button>
                      </span>
                    </div>
                    <div class="tutorial-structure-line">
                      <span class="tutorial-code">optional support</span>
                      <span class="tutorial-composer-hint"><strong>Composer:</strong> activate <strong>support i/y</strong>, valence <strong>ta</strong>, matrix <strong>yawi</strong>.</span>
                      <span class="tutorial-example-inline">
                        <button type="button" class="tutorial-token" data-example="ta-[y]awi">
                          ta-[y]awi
                        </button>
                      </span>
                    </div>
                    <div class="tutorial-structure-line">
                      <span class="tutorial-code">inline ti subclass</span>
                      <span class="tutorial-composer-hint"><strong>Composer:</strong> matrix <strong>michti</strong> + subclass <strong>ti1</strong>.</span>
                      <span class="tutorial-example-inline">
                        <button type="button" class="tutorial-token" data-example="(michti1)">
                          (michti1)
                        </button>
                      </span>
                    </div>
                  </div>
                  <div class="tutorial-note">
                    Mental order: external pieces on the left, core at the end. If you see <code>-(...)</code>, the core is already transitive.
                  </div>
                </div>
              </div>
              <div class="tutorial-footer">
                <div class="tutorial-tip">
                  Tip: press any example to load it directly, or rebuild the same structure with the composer buttons.
                </div>
                <button type="button" class="tutorial-close-pill" data-tutorial-close>Got it</button>
              </div>
            </div>
          </div>
        </div>
    `;
    }
    function ClassicalPanelShell() {
      return `      <div
            class="panel-grid"
            aria-label="Andrews nuclear clause board"
            data-andrews-layout="source-authority-authorized-result"
            data-andrews-panel-model="whole-transcription-canvas"
            data-andrews-source-rank-path="morpheme-root-stem-nuclear-clause-particle-group-sentence"
            data-andrews-result-can-feed-next-source="true"
            data-andrews-lesson="4"
            data-andrews-unit="clausula-nuclear"
            data-andrews-general-formula="subject-predicate"
            data-andrews-boundary="#...#"
            data-andrews-not-word="true"
            data-panel-columns="classical-basal-units"
            data-classical-basal-units="particle vnc nnc"
            data-classical-basal-unit="vnc"
            data-classical-basal-authority="ANDREWS_TRANSCRIPTION_CANVAS.md"
            data-nawat-pipil-system="not-used"
          >
    ` + '        <div class="panel-stack" data-classical-panel-stack="source-authority-result">\n' + ClassicalPanelTabs() + '          <div class="panel-main-column" data-classical-basal-unit="vnc">\n' + '            <div id="classical-source-panel" class="classical-panel-container classical-panel-container--source" data-classical-panel-container="source" data-andrews-panel="#1-source">\n' + ClassicalSourcePanel() + '            </div>\n' + '            <div id="classical-authority-panel" class="classical-panel-container classical-panel-container--authority" data-classical-panel-container="authority" data-andrews-panel="#2-authority">\n' + ClassicalAuthorityPanel() + '            </div>\n' + '          </div>\n' + '        </div>\n' + '        <div class="panel-output-column" data-classical-basal-unit="vnc">\n' + '          <div id="classical-result-panel" class="classical-panel-container classical-panel-container--result" data-classical-panel-container="authorized-result" data-andrews-panel="#3-authorized-result">\n' + ClassicalResultPanel() + '          </div>\n' + '        </div>\n' + '      </div>\n';
    }
    function installClassicalShell() {
      const root = targetObject.document.getElementById("classical-app-root");
      if (root && root.dataset.classicalShellInstalled !== "true") {
        root.innerHTML = ClassicalPanelShell();
        root.dataset.classicalShellInstalled = "true";
      }
      const footerRoot = targetObject.document.getElementById("classical-footer-root");
      if (footerRoot && footerRoot.dataset.classicalShellInstalled !== "true") {
        footerRoot.innerHTML = ClassicalFooter();
        footerRoot.dataset.classicalShellInstalled = "true";
      }
      const modalRoot = targetObject.document.getElementById("classical-modal-root");
      if (modalRoot && modalRoot.dataset.classicalShellInstalled !== "true") {
        modalRoot.innerHTML = ClassicalTutorialModal();
        modalRoot.dataset.classicalShellInstalled = "true";
      }
    }
    function installClassicalShellWhenReady() {
      if (targetObject.document.getElementById("classical-app-root")) {
        installClassicalShell();
        return;
      }
      targetObject.document.addEventListener("DOMContentLoaded", installClassicalShell, {
        once: true
      });
    }
    installClassicalShellWhenReady();
    Object.assign(targetObject.window, {
      ClassicalPanelTabs,
      ClassicalSourcePanel,
      ClassicalAuthorityPanel,
      ClassicalResultPanel,
      ClassicalFooter,
      ClassicalTutorialModal,
      ClassicalPanelShell,
      installClassicalShell
    });

    const api = {};
    api.ClassicalPanelTabs = ClassicalPanelTabs;
    api.ClassicalSourcePanel = ClassicalSourcePanel;
    api.ClassicalAuthorityPanel = ClassicalAuthorityPanel;
    api.ClassicalResultPanel = ClassicalResultPanel;
    api.ClassicalFooter = ClassicalFooter;
    api.ClassicalTutorialModal = ClassicalTutorialModal;
    api.ClassicalPanelShell = ClassicalPanelShell;
    api.installClassicalShell = installClassicalShell;
    api.installClassicalShellWhenReady = installClassicalShellWhenReady;
    return api;
}

export function installClassicalShellGlobals(targetObject = globalThis) {
    const api = createClassicalShellModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
