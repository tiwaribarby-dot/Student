
// French News Transition QA Tool - Static Implementation
class FrenchNewsQATool {
    constructor() {
        this.sampleData = `Titre: Quillebeuf-sur-Seine : Exposition Hommage à Max-Pol Fouchet du 21 au 25 août

Chapeau: Une exposition commémore la disparition de Max-Pol Fouchet à Quillebeuf-sur-Seine du 21 au 25 août. L'événement est organisé par Dominique Forget.

Article:
À Quillebeuf-sur-Seine, une exposition est organisée du 21 au 25 août pour commémorer la disparition de Max-Pol Fouchet, l'écrivain dont l'école communale porte le nom depuis 1981. Pilotée par Dominique Forget, une ancienne institutrice passionnée, cette initiative célèbre la vie riche et polyvalente de cet homme de lettres né en 1913 à Saint-Vaast-la-Hougue, connu pour ses poèmes, ses romans, ses essais et son rôle dans la résistance avec la revue "Fontaine", ainsi que ses voyages en Inde, en Afrique et en Amérique latine, et son amitié tumultueuse avec Albert Camus. L'événement met en valeur les liens profonds de Fouchet avec la commune, inspirés par ses souvenirs évoqués dans des ouvrages comme "Les Évidences secrètes", et rend hommage à son héritage culturel au cœur de cette petite ville normande.

À savoir également dans votre département
À Évreux, une tentative de vol à l'étalage par un adolescent de 16 ans, issu d'un foyer de l'aide sociale, s'est produite mardi 19 août à l'Intermarché de Nétreville. Il a essayé de quitter le magasin avec des boissons alcoolisées d'une valeur de 128 €. Lors de l'incident, il a blessé un agent de sécurité de 59 ans en lui frappant la tête avec une bouteille, ce qui a nécessité l'intervention des pompiers et l'arrivée de la police vers 17 h pour procéder à son arrestation.

Dans l'actualité culturelle,

La troisième édition du festival En Pagaill', organisé par une association de passionnés de musique à Gaillon, se déroulera le samedi 23 août au pied du château, avec un thème 100 % reggae pour marquer un cap de maturité. Une cinquantaine de bénévoles s'activent déjà pour préparer l'événement, qui vise à attirer plus de 1 000 festivaliers grâce à une programmation riche incluant des têtes d'affiche comme Broussaï, Jah Militant Sound System et Junior Roy pour leur première scène commune, Flox avec ses influences électroniques, Mo'Kalamity et ses rythmes caribéens, ainsi que des groupes locaux comme Roots Riddim. Pour favoriser la fête, un camping sera ouvert pour la première fois, laissant entrevoir une possible extension sur deux jours à l'avenir.

Ce projet original attire.

Dans les plaines du Vexin normand, à Civières, commune de Vexin-sur-Epte, une famille d'agriculteurs a entrepris une rénovation audacieuse d'un vieux wagon des années 1960, transformé en hébergement insolite après un an de travaux intenses incluant désossage, ponçage, peinture et des conseils pour l'électricité, sous l'impulsion de Cécilia Richard, qui a repris l'exploitation familiale en 2018. Ce wagon-lit offre une expérience d'évasion authentique avec une vue panoramique sur les paysages normands, pour une centaine d'euros la nuitée, encourageant la déconnexion grâce à des équipements comme un barbecue, une table de pique-nique, un tennis de table et des vélos, tout en proposant des toilettes sèches impeccables et une douche en plein air avec eau chaude. En troisième saison, les réservations ont connu un succès notable cette année, malgré les défis météorologiques passés. Pour plus d'informations, il suffit de consulter le site Wagonlit27.

Pour finir, on annonce que

La ferme pédagogique Anymania à Val-de-Reuil reprend son spectacle équestre le samedi 23 août à 19 h, avec Élisa Laville, cavalière de 28 ans, réputée internationalement pour sa connexion avec les chevaux. Sous la direction de Marie-Morgane Trémollières, l'événement d'une heure et demie inclura quatre tableaux : Garrocha en feu, Voltige, Liberté avec des chevaux, un shetland et un chien, et Dextre avec rênes. Plus de 200 spectateurs sont attendus. Les tarifs sont de 12 € pour les 14 ans et plus, 8 € pour les 6-14 ans, et gratuit pour les moins de 6 ans. Réservez au 06 03 15 98 50 ou sur www.anymania.fr.

Transitions générées:
1. Dans l'actualité culturelle,
2. Ce projet original attire.
3. Pour finir, on annonce que`;

        this.concludingIndicators = [
            'pour finir', 'enfin', 'finalement', 'en conclusion', 
            'pour conclure', 'en dernier lieu', 'pour terminer',
            'dernièrement', 'en définitive', 'au final'
        ];

        this.stopWords = new Set([
            'le', 'de', 'et', 'à', 'un', 'il', 'être', 'et', 'en', 'avoir', 'que', 'pour',
            'dans', 'ce', 'son', 'une', 'sur', 'avec', 'ne', 'se', 'pas', 'tout', 'plus',
            'par', 'grand', 'comme', 'après', 'autre', 'aussi', 'sans', 'sous', 'depuis',
            'pendant', 'très', 'bien', 'entre', 'encore', 'moins', 'même', 'jusqu', 'où',
            'quand', 'comment', 'pourquoi', 'qui', 'dont', 'la', 'les', 'des', 'du'
        ]);

        this.results = null;
        this.summaryStats = null;

        this.initializeEventListeners();
        this.updateThresholdDisplay();
    }

    initializeEventListeners() {
        try {
            // Threshold slider
            const thresholdSlider = document.getElementById('similarity-threshold');
            if (thresholdSlider) {
                thresholdSlider.addEventListener('input', () => this.updateThresholdDisplay());
            }

            // File upload
            const fileUpload = document.getElementById('file-upload');
            if (fileUpload) {
                fileUpload.addEventListener('change', (e) => this.handleFileUpload(e));
            }

            // Text input
            const textInput = document.getElementById('text-input');
            if (textInput) {
                textInput.addEventListener('input', () => this.updateAnalyzeButton());
            }

            // Load sample data
            const loadSampleBtn = document.getElementById('load-sample');
            if (loadSampleBtn) {
                loadSampleBtn.addEventListener('click', () => this.loadSampleData());
            }

            // Analyze button
            const analyzeBtn = document.getElementById('analyze-btn');
            if (analyzeBtn) {
                analyzeBtn.addEventListener('click', () => this.analyzeTransitions());
            }

            // Export buttons
            const exportCsvBtn = document.getElementById('export-csv');
            if (exportCsvBtn) {
                exportCsvBtn.addEventListener('click', () => this.exportCSV());
            }

            const exportHtmlBtn = document.getElementById('export-html');
            if (exportHtmlBtn) {
                exportHtmlBtn.addEventListener('click', () => this.exportHTML());
            }

            // Filters
            const showFailedOnly = document.getElementById('show-failed-only');
            if (showFailedOnly) {
                showFailedOnly.addEventListener('change', () => this.filterResults());
            }

            const articleFilter = document.getElementById('article-filter');
            if (articleFilter) {
                articleFilter.addEventListener('change', () => this.filterResults());
            }
        } catch (error) {
            console.error('Error initializing event listeners:', error);
        }
    }

    updateThresholdDisplay() {
        try {
            const slider = document.getElementById('similarity-threshold');
            const display = document.getElementById('threshold-value');
            if (slider && display) {
                display.textContent = slider.value;
            }
        } catch (error) {
            console.error('Error updating threshold display:', error);
        }
    }

    handleFileUpload(event) {
        try {
            const file = event.target.files[0];
            const statusDiv = document.getElementById('file-status');
            
            if (!file) {
                if (statusDiv) {
                    statusDiv.innerHTML = '';
                }
                return;
            }

            if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const textInput = document.getElementById('text-input');
                        if (textInput) {
                            textInput.value = e.target.result;
                            this.updateAnalyzeButton();
                        }
                        if (statusDiv) {
                            statusDiv.innerHTML = `<span class="success">✓ File loaded: ${file.name}</span>`;
                        }
                    } catch (error) {
                        console.error('Error processing file content:', error);
                        if (statusDiv) {
                            statusDiv.innerHTML = `<span class="error">✗ Error reading file content</span>`;
                        }
                    }
                };
                reader.onerror = () => {
                    if (statusDiv) {
                        statusDiv.innerHTML = `<span class="error">✗ Error reading file</span>`;
                    }
                };
                reader.readAsText(file, 'UTF-8');
            } else {
                if (statusDiv) {
                    statusDiv.innerHTML = `<span class="error">✗ Please upload a .txt file</span>`;
                }
            }
        } catch (error) {
            console.error('Error handling file upload:', error);
            this.showMessage('Error uploading file. Please try again.', 'error');
        }
    }

    loadSampleData() {
        try {
            const textInput = document.getElementById('text-input');
            if (textInput) {
                textInput.value = this.sampleData;
                this.updateAnalyzeButton();
                this.showMessage('Sample data loaded successfully!', 'success');
            }
        } catch (error) {
            console.error('Error loading sample data:', error);
            this.showMessage('Error loading sample data', 'error');
        }
    }

    updateAnalyzeButton() {
        try {
            const textInput = document.getElementById('text-input');
            const analyzeBtn = document.getElementById('analyze-btn');
            
            if (textInput && analyzeBtn) {
                const textValue = textInput.value.trim();
                analyzeBtn.disabled = !textValue;
            }
        } catch (error) {
            console.error('Error updating analyze button:', error);
        }
    }

    showMessage(message, type = 'info') {
        try {
            // Create a temporary message element
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}`;
            messageDiv.textContent = message;
            messageDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                animation: slideInRight 0.3s ease-out;
            `;

            switch(type) {
                case 'success':
                    messageDiv.style.backgroundColor = '#28a745';
                    break;
                case 'error':
                    messageDiv.style.backgroundColor = '#dc3545';
                    break;
                case 'warning':
                    messageDiv.style.backgroundColor = '#ffc107';
                    messageDiv.style.color = '#212529';
                    break;
                default:
                    messageDiv.style.backgroundColor = '#17a2b8';
            }

            document.body.appendChild(messageDiv);

            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 3000);
        } catch (error) {
            console.error('Error showing message:', error);
        }
    }

    async analyzeTransitions() {
        try {
            const textInput = document.getElementById('text-input');
            const similarityThreshold = parseFloat(document.getElementById('similarity-threshold').value);

            if (!textInput) {
                this.showMessage('Text input not found', 'error');
                return;
            }

            const textValue = textInput.value.trim();
            if (!textValue) {
                this.showMessage('Please provide article text to analyze', 'error');
                return;
            }

            // Show loading state
            const loadingDiv = document.getElementById('loading');
            const analyzeBtn = document.getElementById('analyze-btn');
            
            if (loadingDiv) {
                loadingDiv.classList.remove('hidden');
            }
            if (analyzeBtn) {
                analyzeBtn.disabled = true;
            }

            try {
                // Parse articles
                const articles = this.parseArticles(textValue);
                
                if (articles.length === 0) {
                    throw new Error('No valid articles found in the input text');
                }

                // Process each article
                const allResults = [];
                for (let i = 0; i < articles.length; i++) {
                    const articleResults = this.processArticle(articles[i], similarityThreshold);
                    allResults.push(...articleResults);
                }

                // Calculate summary statistics
                this.results = allResults;
                this.summaryStats = this.calculateSummaryStats(allResults);

                // Display results
                this.displayResults();
                this.showMessage(`Analysis completed! Found ${allResults.length} transitions in ${articles.length} article(s)`, 'success');

            } catch (error) {
                console.error('Analysis error:', error);
                this.showMessage(`Error processing articles: ${error.message}`, 'error');
            } finally {
                // Hide loading state
                if (loadingDiv) {
                    loadingDiv.classList.add('hidden');
                }
                if (analyzeBtn) {
                    analyzeBtn.disabled = false;
                }
            }
        } catch (error) {
            console.error('Critical error in analyzeTransitions:', error);
            this.showMessage('Critical error during analysis. Please check console for details.', 'error');
        }
    }

    parseArticles(text) {
        try {
            const articles = [];
            const articleTexts = this.splitArticles(text);

            articleTexts.forEach((articleText, index) => {
                try {
                    const article = this.parseSingleArticle(articleText, `article_${index + 1}`);
                    if (article) {
                        articles.push(article);
                    }
                } catch (error) {
                    console.warn(`Error parsing article ${index + 1}:`, error);
                }
            });

            return articles;
        } catch (error) {
            console.error('Error parsing articles:', error);
            throw error;
        }
    }

    splitArticles(text) {
        try {
            text = text.trim();
            
            if (text.split('Titre:').length > 2) {
                const articles = text.split(/\n\s*Titre:/);
                // Add "Titre:" back to all but the first
                for (let i = 1; i < articles.length; i++) {
                    articles[i] = 'Titre:' + articles[i];
                }
                return articles.filter(article => article.trim());
            } else {
                return [text];
            }
        } catch (error) {
            console.error('Error splitting articles:', error);
            return [text];
        }
    }

    parseSingleArticle(text, articleId) {
        try {
            const article = {
                article_id: articleId,
                title: '',
                chapeau: '',
                content: '',
                paragraphs: [],
                transitions: []
            };

            // Extract title
            const titleMatch = text.match(/Titre:\s*(.+?)(?=\n|$)/i);
            if (titleMatch) {
                article.title = titleMatch[1].trim();
            }

            // Extract chapeau
            const chapeauMatch = text.match(/Chapeau:\s*(.+?)(?=\nArticle:|$)/is);
            if (chapeauMatch) {
                article.chapeau = chapeauMatch[1].trim();
            }

            // Extract article content
            const contentMatch = text.match(/Article:\s*(.+?)(?=\nTransitions générées:|$)/is);
            if (contentMatch) {
                article.content = contentMatch[1].trim();
                
                // Split content into paragraphs
                const contentLines = article.content.split('\n');
                const paragraphs = [];
                let currentParagraph = [];
                
                for (const line of contentLines) {
                    const trimmedLine = line.trim();
                    if (!trimmedLine) {
                        if (currentParagraph.length > 0) {
                            paragraphs.push(currentParagraph.join(' '));
                            currentParagraph = [];
                        }
                    } else {
                        currentParagraph.push(trimmedLine);
                    }
                }
                
                if (currentParagraph.length > 0) {
                    paragraphs.push(currentParagraph.join(' '));
                }
                
                article.paragraphs = paragraphs;
            }

            // Extract transitions
            const transitionsMatch = text.match(/Transitions générées:\s*(.+)/is);
            if (transitionsMatch) {
                const transitionsText = transitionsMatch[1].trim();
                article.transitions = this.parseTransitions(transitionsText);
            }

            // Validate essential components
            if (!article.content || article.transitions.length === 0) {
                console.warn(`Article ${articleId} missing essential components`);
                return null;
            }

            return article;
        } catch (error) {
            console.error(`Error parsing single article ${articleId}:`, error);
            return null;
        }
    }

    parseTransitions(transitionsText) {
        try {
            const transitions = [];
            const pattern = /(\d+)\.\s*(.+?)(?=\n\d+\.|$)/gs;
            let match;

            const matches = [];
            while ((match = pattern.exec(transitionsText)) !== null) {
                matches.push([match[1], match[2].trim()]);
            }

            matches.forEach(([num, transitionText], index) => {
                const cleanText = transitionText.replace(/[.,;:!?]+$/, '');
                const paraIdx = index + 1;
                const isConcliding = (index === matches.length - 1);

                transitions.push({
                    index: parseInt(num),
                    text: transitionText,
                    clean_text: cleanText,
                    para_idx: paraIdx,
                    is_concluding: isConcliding,
                    position_in_article: isConcliding ? 'final' : 'middle'
                });
            });

            return transitions;
        } catch (error) {
            console.error('Error parsing transitions:', error);
            return [];
        }
    }

    processArticle(article, similarityThreshold) {
        try {
            const results = [];
            const articleLemmas = this.getArticleLemmas(article);

            article.transitions.forEach((transition, index) => {
                try {
                    const result = {
                        article_id: article.article_id,
                        para_idx: transition.para_idx,
                        transition_text: transition.text,
                        word_count: transition.text.split(' ').length,
                        is_concluding: transition.is_concluding,
                        rule_checks: {},
                        repetition_info: {},
                        similarity_scores: {},
                        overall_pass: true,
                        failure_reasons: [],
                        triggered_rules: []
                    };

                    // Rule validation
                    result.rule_checks = this.validateTransition(transition);

                    // Check if rules passed
                    for (const [rule, passed] of Object.entries(result.rule_checks)) {
                        if (!passed) {
                            result.overall_pass = false;
                            result.triggered_rules.push(rule);
                            if (rule === 'word_limit') {
                                result.failure_reasons.push(`Exceeds 5-word limit (${result.word_count} words)`);
                            } else if (rule === 'concluding_placement') {
                                result.failure_reasons.push('Non-concluding transition in final position');
                            }
                        }
                    }

                    // Repetition detection
                    result.repetition_info = this.detectRepetition(transition.text, articleLemmas);
                    if (result.repetition_info.repeated_lemmas.length > 0) {
                        result.overall_pass = false;
                        result.failure_reasons.push(`Repeated lemmas: ${result.repetition_info.repeated_lemmas.join(', ')}`);
                    }

                    // Similarity analysis
                    result.similarity_scores = this.analyzeSimilarity(transition, article, similarityThreshold);
                    const simNext = result.similarity_scores.similarity_next || 0;
                    const simPrev = result.similarity_scores.similarity_prev || 0;

                    if (simNext <= simPrev + similarityThreshold) {
                        result.similarity_scores.thematic_cohesion_pass = false;
                        result.overall_pass = false;
                        result.triggered_rules.push('thematic_cohesion');
                        result.failure_reasons.push(`Poor thematic cohesion: sim_next (${simNext.toFixed(3)}) ≤ sim_prev (${simPrev.toFixed(3)})`);
                    } else {
                        result.similarity_scores.thematic_cohesion_pass = true;
                    }

                    results.push(result);
                } catch (error) {
                    console.error(`Error processing transition ${index}:`, error);
                }
            });

            return results;
        } catch (error) {
            console.error('Error processing article:', error);
            return [];
        }
    }

    validateTransition(transition) {
        try {
            const results = {};

            // Word limit check (≤5 words)
            const text = transition.clean_text || transition.text;
            const wordCount = text.split(' ').length;
            results.word_limit = wordCount <= 5;

            // Concluding placement check
            const textLower = transition.text.toLowerCase();
            const isConcludingTransition = this.concludingIndicators.some(indicator => 
                textLower.includes(indicator)
            );
            const isInFinalPosition = transition.is_concluding;

            // If it's a concluding transition, it should be in final position
            if (isConcludingTransition && !isInFinalPosition) {
                results.concluding_placement = false;
            } else {
                results.concluding_placement = true;
            }

            return results;
        } catch (error) {
            console.error('Error validating transition:', error);
            return { word_limit: false, concluding_placement: false };
        }
    }

    getArticleLemmas(article) {
        try {
            const allText = [];
            
            if (article.title) allText.push(article.title);
            if (article.chapeau) allText.push(article.chapeau);
            if (article.content) allText.push(article.content);

            const combinedText = allText.join(' ');
            const lemmas = this.extractLemmas(combinedText);
            
            // Count frequency of each lemma
            const lemmaCount = {};
            lemmas.forEach(lemma => {
                lemmaCount[lemma] = (lemmaCount[lemma] || 0) + 1;
            });

            return lemmaCount;
        } catch (error) {
            console.error('Error getting article lemmas:', error);
            return {};
        }
    }

    extractLemmas(text) {
        try {
            // Simple lemmatization for French (basic stemming approach)
            const words = text.toLowerCase()
                .replace(/[^\w\s]/g, ' ')
                .split(/\s+/)
                .filter(word => word.length > 2 && !this.stopWords.has(word));

            // Basic French stemming rules
            return words.map(word => {
                // Remove common suffixes
                word = word.replace(/(ment|tion|sion|ance|ence|ique|able|ible)$/, '');
                word = word.replace(/(er|ir|re|oir)$/, ''); // verb infinitives
                word = word.replace(/(s|x)$/, ''); // plurals
                word = word.replace(/(e)$/, ''); // feminine endings
                return word;
            });
        } catch (error) {
            console.error('Error extracting lemmas:', error);
            return [];
        }
    }

    detectRepetition(transitionText, articleLemmas) {
        try {
            const transitionLemmas = this.extractLemmas(transitionText);
            const repeatedLemmas = [];
            const repetitionCounts = {};

            transitionLemmas.forEach(lemma => {
                if (articleLemmas[lemma] && articleLemmas[lemma] > 1) {
                    repeatedLemmas.push(lemma);
                    repetitionCounts[lemma] = articleLemmas[lemma];
                }
            });

            return {
                repeated_lemmas: repeatedLemmas,
                repetition_counts: repetitionCounts,
                has_repetition: repeatedLemmas.length > 0,
                transition_lemmas: transitionLemmas
            };
        } catch (error) {
            console.error('Error detecting repetition:', error);
            return {
                repeated_lemmas: [],
                repetition_counts: {},
                has_repetition: false,
                transition_lemmas: []
            };
        }
    }

    analyzeSimilarity(transition, article, threshold) {
        try {
            const transitionText = transition.text;
            const paraIdx = transition.para_idx;
            const paragraphs = article.paragraphs;

            const results = {
                transition_text: transitionText,
                para_idx: paraIdx,
                next_paragraph: '',
                previous_paragraph: '',
                similarity_next: 0.0,
                similarity_prev: 0.0,
                similarity_difference: 0.0,
                thematic_cohesion_pass: false,
                has_context: false
            };

            // Get context paragraphs
            if (paraIdx > 0 && paraIdx - 1 < paragraphs.length) {
                results.previous_paragraph = paragraphs[paraIdx - 1];
            }

            if (paraIdx < paragraphs.length) {
                results.next_paragraph = paragraphs[paraIdx];
            }

            results.has_context = !!(results.previous_paragraph || results.next_paragraph);

            if (results.has_context) {
                // Calculate similarities using basic text similarity
                if (results.next_paragraph) {
                    results.similarity_next = this.calculateTextSimilarity(transitionText, results.next_paragraph);
                }

                if (results.previous_paragraph) {
                    results.similarity_prev = this.calculateTextSimilarity(transitionText, results.previous_paragraph);
                }

                results.similarity_difference = results.similarity_next - results.similarity_prev;
                results.thematic_cohesion_pass = results.similarity_difference > threshold;
            }

            return results;
        } catch (error) {
            console.error('Error analyzing similarity:', error);
            return {
                transition_text: '',
                para_idx: 0,
                next_paragraph: '',
                previous_paragraph: '',
                similarity_next: 0.0,
                similarity_prev: 0.0,
                similarity_difference: 0.0,
                thematic_cohesion_pass: false,
                has_context: false
            };
        }
    }

    calculateTextSimilarity(text1, text2) {
        try {
            // Simple Jaccard similarity based on word overlap
            const words1 = new Set(this.extractLemmas(text1));
            const words2 = new Set(this.extractLemmas(text2));

            const intersection = new Set([...words1].filter(x => words2.has(x)));
            const union = new Set([...words1, ...words2]);

            return union.size > 0 ? intersection.size / union.size : 0;
        } catch (error) {
            console.error('Error calculating text similarity:', error);
            return 0;
        }
    }

    calculateSummaryStats(results) {
        try {
            if (results.length === 0) {
                return {
                    total_transitions: 0,
                    compliance_rate: 0,
                    failed_transitions: 0,
                    rule_failures: {},
                    repeated_lemmas: {},
                    failure_reasons: {}
                };
            }

            const totalTransitions = results.length;
            const passedTransitions = results.filter(r => r.overall_pass).length;
            const failedTransitions = totalTransitions - passedTransitions;
            const complianceRate = (passedTransitions / totalTransitions) * 100;

            // Rule failure analysis
            const ruleFailures = {};
            results.forEach(result => {
                result.triggered_rules.forEach(rule => {
                    ruleFailures[rule] = (ruleFailures[rule] || 0) + 1;
                });
            });

            // Repeated lemmas analysis
            const allRepeatedLemmas = {};
            results.forEach(result => {
                result.repetition_info.repeated_lemmas.forEach(lemma => {
                    allRepeatedLemmas[lemma] = (allRepeatedLemmas[lemma] || 0) + 1;
                });
            });

            // Failure reasons analysis
            const failureReasons = {};
            results.forEach(result => {
                result.failure_reasons.forEach(reason => {
                    if (reason.includes('word limit')) {
                        failureReasons['Word Limit Exceeded'] = (failureReasons['Word Limit Exceeded'] || 0) + 1;
                    } else if (reason.includes('repeated') || reason.includes('repetition')) {
                        failureReasons['Lemma Repetition'] = (failureReasons['Lemma Repetition'] || 0) + 1;
                    } else if (reason.includes('cohesion')) {
                        failureReasons['Poor Thematic Cohesion'] = (failureReasons['Poor Thematic Cohesion'] || 0) + 1;
                    } else if (reason.includes('placement')) {
                        failureReasons['Incorrect Placement'] = (failureReasons['Incorrect Placement'] || 0) + 1;
                    } else {
                        failureReasons['Other'] = (failureReasons['Other'] || 0) + 1;
                    }
                });
            });

            return {
                total_transitions: totalTransitions,
                passed_transitions: passedTransitions,
                failed_transitions: failedTransitions,
                compliance_rate: complianceRate,
                rule_failures: ruleFailures,
                repeated_lemmas: allRepeatedLemmas,
                failure_reasons: failureReasons
            };
        } catch (error) {
            console.error('Error calculating summary stats:', error);
            return {
                total_transitions: 0,
                compliance_rate: 0,
                failed_transitions: 0,
                rule_failures: {},
                repeated_lemmas: {},
                failure_reasons: {}
            };
        }
    }

    displayResults() {
        try {
            if (!this.results || !this.summaryStats) return;

            // Show results section
            const resultsSection = document.getElementById('results-section');
            if (resultsSection) {
                resultsSection.classList.remove('hidden');
            }

            // Update metrics
            const totalTransitionsEl = document.getElementById('total-transitions');
            if (totalTransitionsEl) {
                totalTransitionsEl.textContent = this.summaryStats.total_transitions;
            }

            const complianceRateEl = document.getElementById('compliance-rate');
            if (complianceRateEl) {
                complianceRateEl.textContent = `${this.summaryStats.compliance_rate.toFixed(1)}%`;
            }

            const failedTransitionsEl = document.getElementById('failed-transitions');
            if (failedTransitionsEl) {
                failedTransitionsEl.textContent = this.summaryStats.failed_transitions;
            }
            
            const uniqueArticles = new Set(this.results.map(r => r.article_id)).size;
            const articlesProcessedEl = document.getElementById('articles-processed');
            if (articlesProcessedEl) {
                articlesProcessedEl.textContent = uniqueArticles;
            }

            // Populate article filter
            this.populateArticleFilter();

            // Display results table
            this.displayResultsTable();

            // Create visualizations
            this.createVisualizations();

            // Scroll to results
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            console.error('Error displaying results:', error);
        }
    }

    populateArticleFilter() {
        try {
            const select = document.getElementById('article-filter');
            if (!select) return;

            select.innerHTML = '<option value="">All Articles</option>';
            
            const uniqueArticles = [...new Set(this.results.map(r => r.article_id))];
            uniqueArticles.forEach(articleId => {
                const option = document.createElement('option');
                option.value = articleId;
                option.textContent = articleId;
                option.selected = true;
                select.appendChild(option);
            });
        } catch (error) {
            console.error('Error populating article filter:', error);
        }
    }

    displayResultsTable() {
        try {
            const tbody = document.querySelector('#results-table tbody');
            if (!tbody) return;

            tbody.innerHTML = '';

            this.getFilteredResults().forEach(result => {
                const row = document.createElement('tr');
                
                const formatBoolean = (value) => value ? 
                    '<span class="pass">✓</span>' : '<span class="fail">✗</span>';

                row.innerHTML = `
                    <td>${result.article_id}</td>
                    <td>${result.para_idx}</td>
                    <td class="transition-text">${result.transition_text}</td>
                    <td>${formatBoolean(result.rule_checks.word_limit)}</td>
                    <td>${formatBoolean(result.rule_checks.concluding_placement)}</td>
                    <td>${formatBoolean(result.repetition_info.repeated_lemmas.length === 0)}</td>
                    <td>${formatBoolean(result.similarity_scores.thematic_cohesion_pass)}</td>
                    <td>${formatBoolean(result.overall_pass)}</td>
                    <td>${result.failure_reasons.join(' | ')}</td>
                    <td class="number">${(result.similarity_scores.similarity_next || 0).toFixed(3)}</td>
                    <td class="number">${(result.similarity_scores.similarity_prev || 0).toFixed(3)}</td>
                    <td class="number">${result.word_count}</td>
                `;

                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Error displaying results table:', error);
        }
    }

    getFilteredResults() {
        try {
            let filtered = [...this.results];

            // Filter by failed only
            const showFailedOnly = document.getElementById('show-failed-only');
            if (showFailedOnly && showFailedOnly.checked) {
                filtered = filtered.filter(r => !r.overall_pass);
            }

            // Filter by selected articles
            const articleFilter = document.getElementById('article-filter');
            if (articleFilter) {
                const selectedArticles = Array.from(articleFilter.selectedOptions)
                    .map(option => option.value)
                    .filter(value => value);

                if (selectedArticles.length > 0) {
                    filtered = filtered.filter(r => selectedArticles.includes(r.article_id));
                }
            }

            return filtered;
        } catch (error) {
            console.error('Error filtering results:', error);
            return this.results || [];
        }
    }

    filterResults() {
        this.displayResultsTable();
    }

    createVisualizations() {
        try {
            this.createFailureChart();
            this.createWordCountChart();
        } catch (error) {
            console.error('Error creating visualizations:', error);
        }
    }

    createFailureChart() {
        try {
            const ctx = document.getElementById('failure-chart');
            if (!ctx) return;

            const failureReasons = this.summaryStats.failure_reasons;

            const labels = Object.keys(failureReasons);
            const data = Object.values(failureReasons);

            if (labels.length === 0) {
                return;
            }

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Number of Failures',
                        data: data,
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#9966FF'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error creating failure chart:', error);
        }
    }

    createWordCountChart() {
        try {
            const ctx = document.getElementById('wordcount-chart');
            if (!ctx) return;
            
            const wordCounts = this.results.map(r => r.word_count);
            const wordCountDistribution = {};
            
            wordCounts.forEach(count => {
                const bucket = count <= 5 ? '≤5 words' : '>5 words';
                wordCountDistribution[bucket] = (wordCountDistribution[bucket] || 0) + 1;
            });

            const labels = Object.keys(wordCountDistribution);
            const data = Object.values(wordCountDistribution);

            if (labels.length === 0) {
                return;
            }

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: ['#28a745', '#dc3545']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error creating word count chart:', error);
        }
    }

    exportCSV() {
        try {
            if (!this.results) {
                this.showMessage('No results to export', 'warning');
                return;
            }

            const headers = [
                'Article ID', 'Para Index', 'Transition Text', 'Word Limit Pass', 
                'Concluding Placement Pass', 'Repetition Pass', 'Thematic Cohesion Pass',
                'Overall Pass', 'Failure Reason', 'Triggered Rule',
                'Similarity Next', 'Similarity Prev', 'Word Count'
            ];

            const csvData = [headers];

            this.results.forEach(result => {
                csvData.push([
                    result.article_id,
                    result.para_idx,
                    `"${result.transition_text.replace(/"/g, '""')}"`,
                    result.rule_checks.word_limit,
                    result.rule_checks.concluding_placement,
                    result.repetition_info.repeated_lemmas.length === 0,
                    result.similarity_scores.thematic_cohesion_pass,
                    result.overall_pass,
                    `"${result.failure_reasons.join(' | ').replace(/"/g, '""')}"`,
                    `"${result.triggered_rules.join(', ').replace(/"/g, '""')}"`,
                    (result.similarity_scores.similarity_next || 0).toFixed(3),
                    (result.similarity_scores.similarity_prev || 0).toFixed(3),
                    result.word_count
                ]);
            });

            const csvContent = csvData.map(row => row.join(',')).join('\n');
            this.downloadFile(csvContent, 'transition_analysis_results.csv', 'text/csv');
        } catch (error) {
            console.error('Error exporting CSV:', error);
            this.showMessage('Error exporting CSV file', 'error');
        }
    }

    exportHTML() {
        try {
            if (!this.results) {
                this.showMessage('No results to export', 'warning');
                return;
            }

            const tableRows = this.results.map(result => {
                const formatBoolean = (value) => value ? 
                    '<span style="color: green; font-weight: bold;">✓</span>' : 
                    '<span style="color: red; font-weight: bold;">✗</span>';

                return `
                    <tr>
                        <td>${result.article_id}</td>
                        <td>${result.para_idx}</td>
                        <td>${result.transition_text}</td>
                        <td>${formatBoolean(result.rule_checks.word_limit)}</td>
                        <td>${formatBoolean(result.rule_checks.concluding_placement)}</td>
                        <td>${formatBoolean(result.repetition_info.repeated_lemmas.length === 0)}</td>
                        <td>${formatBoolean(result.similarity_scores.thematic_cohesion_pass)}</td>
                        <td>${formatBoolean(result.overall_pass)}</td>
                        <td>${result.failure_reasons.join(' | ')}</td>
                        <td>${(result.similarity_scores.similarity_next || 0).toFixed(3)}</td>
                        <td>${(result.similarity_scores.similarity_prev || 0).toFixed(3)}</td>
                        <td>${result.word_count}</td>
                    </tr>
                `;
            }).join('');

            const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>French News Transition QA Analysis Results</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .summary { background-color: #f5f5f5; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
        .metric { display: inline-block; margin: 10px; padding: 10px; background-color: white; border-radius: 3px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>French News Transition QA Analysis Results</h1>
    
    <div class="summary">
        <h2>Summary Statistics</h2>
        <div class="metric">Total Transitions: <strong>${this.summaryStats.total_transitions}</strong></div>
        <div class="metric">Compliance Rate: <strong>${this.summaryStats.compliance_rate.toFixed(1)}%</strong></div>
        <div class="metric">Failed Transitions: <strong>${this.summaryStats.failed_transitions}</strong></div>
    </div>
    
    <h2>Detailed Results</h2>
    <table>
        <thead>
            <tr>
                <th>Article ID</th>
                <th>Para Index</th>
                <th>Transition Text</th>
                <th>Word Limit ≤5</th>
                <th>Placement OK</th>
                <th>No Repetition</th>
                <th>Cohesion OK</th>
                <th>Overall Pass</th>
                <th>Failure Reason</th>
                <th>Sim Next</th>
                <th>Sim Prev</th>
                <th>Words</th>
            </tr>
        </thead>
        <tbody>
            ${tableRows}
        </tbody>
    </table>
</body>
</html>`;

            this.downloadFile(htmlContent, 'transition_analysis_results.html', 'text/html');
        } catch (error) {
            console.error('Error exporting HTML:', error);
            this.showMessage('Error exporting HTML file', 'error');
        }
    }

    downloadFile(content, filename, mimeType) {
        try {
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.showMessage(`${filename} downloaded successfully!`, 'success');
        } catch (error) {
            console.error('Error downloading file:', error);
            this.showMessage('Error downloading file', 'error');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        new FrenchNewsQATool();
    } catch (error) {
        console.error('Error initializing French News QA Tool:', error);
    }
});
