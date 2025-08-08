/**
 * Advanced Humanizer Engine
 * Specialized for GPTZero evasion
 * Version 3.0
 */

const Humanizer = {
    /**
     * Main function to humanize text
     */
    humanize(text, options = {}) {
        // Default options
        const settings = {
            strength: options.strength || 7,
            style: options.style || 'casual',
            allowTypos: options.allowTypos !== undefined ? options.allowTypos : true,
            allowEmojis: options.allowEmojis !== undefined ? options.allowEmojis : false,
            gptzeroMode: options.gptzeroMode !== undefined ? options.gptzeroMode : true
        };

        try {
            // Step 1: Analyze the text
            const analysis = this.analyzeText(text);
            
            // Step 2: Break into semantic units (paragraphs, sentences)
            const units = this.breakIntoUnits(text);
            
            // Step 3: Transform each unit
            const transformedUnits = units.map(unit => 
                this.transformUnit(unit, settings, analysis)
            );
            
            // Step 4: Reassemble with human-like structure
            let result = this.reassembleText(transformedUnits, settings);
            
            // Step 5: Apply final touches based on style
            result = this.applyStyleTouches(result, settings);
            
            // Step 6: Add human markers (typos, emojis, etc.)
            if (settings.allowTypos) {
                result = this.addHumanMarkers(result, settings);
            }
            
            // Step 7: Apply GPTZero-specific evasion techniques
            if (settings.gptzeroMode) {
                result = this.applyGPTZeroEvasion(result, settings);
            }
            
            return result;
        } catch (error) {
            console.error("Humanization error:", error);
            // Return slightly modified text instead of original to avoid detection
            return this.emergencyHumanize(text);
        }
    },
    
    /**
     * Analyze text to determine characteristics
     */
    analyzeText(text) {
        // Calculate basic metrics
        const wordCount = text.split(/\s+/).length;
        const sentenceCount = (text.match(/[.!?]+/g) || []).length;
        const avgSentenceLength = wordCount / Math.max(1, sentenceCount);
        
        // Detect formality level
        const formalityIndicators = [
            /\b(therefore|furthermore|consequently|thus|hence|accordingly)\b/gi,
            /\b(it is|there are|this is)\b/gi,
            /\b(necessary|sufficient|appropriate|optimal)\b/gi,
            /\b(analyze|examine|investigate|determine)\b/gi
        ];
        
        const informalityIndicators = [
            /\b(so|anyway|basically|like|you know|kind of|sort of)\b/gi,
            /\b(stuff|thing|cool|awesome|great|huge)\b/gi,
            /\b(I think|I feel|I guess)\b/gi,
            /\b(can't|won't|don't|isn't|aren't)\b/gi
        ];
        
        let formalCount = 0;
        let informalCount = 0;
        
        formalityIndicators.forEach(regex => {
            formalCount += (text.match(regex) || []).length;
        });
        
        informalityIndicators.forEach(regex => {
            informalCount += (text.match(regex) || []).length;
        });
        
        const formality = formalCount > informalCount ? 'formal' : 'informal';
        
        return {
            wordCount,
            sentenceCount,
            avgSentenceLength,
            formality,
            complexity: avgSentenceLength > 20 ? 'complex' : 'simple'
        };
    },
    
    /**
     * Break text into semantic units
     */
    breakIntoUnits(text) {
        // More efficient paragraph splitting
        const paragraphs = text.split(/\n\s*\n/);
        const units = [];
        
        // Process in batches for better performance
        for (let i = 0; i < paragraphs.length; i++) {
            const paragraph = paragraphs[i];
            // Use more efficient regex with caching
            const sentenceRegex = /[^.!?]+[.!?]+/g;
            const sentences = paragraph.match(sentenceRegex) || [paragraph];
            
            // Group sentences more efficiently
            let currentUnit = [];
            let currentLength = 0;
            
            for (let j = 0; j < sentences.length; j++) {
                currentUnit.push(sentences[j]);
                currentLength++;
                
                // Create a unit after 1-3 sentences (randomized)
                if (currentLength >= (Math.floor(Math.random() * 2) + 1) || j === sentences.length - 1) {
                    units.push(currentUnit.join(' '));
                    currentUnit = [];
                    currentLength = 0;
                }
            }
            
            // Add paragraph break marker
            units.push('[PARA]');
        }
        
        // Remove trailing paragraph break
        if (units[units.length - 1] === '[PARA]') {
            units.pop();
        }
        
        return units;
    },
    
    /**
     * Transform a single text unit
     */
    transformUnit(unit, settings, analysis) {
        // Skip paragraph breaks
        if (unit === '[PARA]') return unit;
        
        // Apply transformations based on strength and style
        let transformed = unit;
        
        // 1. Restructure sentences
        transformed = this.restructureSentences(transformed, settings.strength);
        
        // 2. Apply style-specific transformations
        transformed = this.applyStyleTransformation(transformed, settings.style, analysis);
        
        // 3. Add human inconsistencies
        transformed = this.addHumanInconsistencies(transformed, settings.strength);
        
        // 4. Vary vocabulary
        transformed = this.varyVocabulary(transformed, settings.strength);
        
        return transformed;
    },
    
    /**
     * Restructure sentences to break AI patterns
     */
    restructureSentences(text, strength) {
        // Don't process short text
        if (text.length < 30) return text;
        
        // Split into sentences
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        if (sentences.length <= 1) return text;
        
        // Apply different restructuring techniques based on strength
        const techniques = [
            // Split long sentences
            (sentence) => {
                if (sentence.length < 100) return sentence;
                
                const parts = sentence.split(/,\s|\;\s/);
                if (parts.length < 2) return sentence;
                
                const midPoint = Math.floor(parts.length / 2);
                return parts.slice(0, midPoint).join(', ') + '. ' + 
                       parts.slice(midPoint).join(', ');
            },
            
            // Convert to question
            (sentence) => {
                if (sentence.includes('?')) return sentence;
                
                // Only convert statements that make sense as questions
                if (sentence.match(/\b(is|are|was|were|do|does|did|have|has|had|can|could|should|would|will)\b/i)) {
                    const cleaned = sentence.replace(/[.!]+$/, '').trim();
                    
                    // Move the verb to the beginning
                    const match = cleaned.match(/\b(is|are|was|were|do|does|did|have|has|had|can|could|should|would|will)\b/i);
                    if (match) {
                        const verb = match[0];
                        const parts = cleaned.split(new RegExp(`\\b${verb}\\b`, 'i'), 2);
                        if (parts.length === 2) {
                            return `${verb.charAt(0).toUpperCase() + verb.slice(1)}${parts[1]}? ${parts[0].trim()}`;
                        }
                    }
                }
                
                return sentence;
            },
            
            // Add interjection
            (sentence) => {
                const interjections = [
                    "Honestly,",
                    "Frankly,",
                    "Surprisingly,",
                    "Interestingly,",
                    "Remarkably,",
                    "Strangely enough,",
                    "To be fair,"
                ];
                
                const interjection = interjections[Math.floor(Math.random() * interjections.length)];
                return `${interjection} ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
            },
            
            // Add personal opinion
            (sentence) => {
                const opinions = [
                    "I think ",
                    "I believe ",
                    "In my opinion, ",
                    "From my perspective, ",
                    "As far as I can tell, ",
                    "It seems to me that "
                ];
                
                const opinion = opinions[Math.floor(Math.random() * opinions.length)];
                return `${opinion}${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
            },
            
            // Add self-correction
            (sentence) => {
                const words = sentence.split(' ');
                if (words.length < 6) return sentence;
                
                // Find a word to "correct"
                const targetIndex = Math.floor(words.length / 2);
                const targetWord = words[targetIndex];
                if (targetWord.length < 5) return sentence;
                
                // Create a "corrected" version
                const corrections = [
                    `${targetWord}—wait, no, I mean ${targetWord}`,
                    `${targetWord}... actually, ${targetWord}`,
                    `${targetWord} (or whatever you call it)`
                ];
                
                const correction = corrections[Math.floor(Math.random() * corrections.length)];
                words[targetIndex] = correction;
                
                return words.join(' ');
            }
        ];
        
        // Apply techniques to different sentences
        for (let i = 0; i < sentences.length; i++) {
            // Apply techniques based on strength
            const numTechniques = Math.min(Math.floor(strength / 3), techniques.length);
            
            // Only apply to some sentences
            if (Math.random() < 0.4) {
                const techniqueIndex = Math.floor(Math.random() * numTechniques);
                sentences[i] = techniques[techniqueIndex](sentences[i]);
            }
        }
        
        return sentences.join(' ');
    },
    
    /**
     * Apply style-specific transformations
     */
    applyStyleTransformation(text, style, analysis) {
        switch (style) {
            case 'casual':
                return this.applyCasualStyle(text);
            case 'formal':
                return this.applyFormalStyle(text);
            case 'enthusiastic':
                return this.applyEnthusiasticStyle(text);
            case 'thoughtful':
                return this.applyThoughtfulStyle(text);
            default:
                // Auto-detect and counter the original style
                return analysis.formality === 'formal' ? 
                    this.applyCasualStyle(text) : 
                    this.applyFormalStyle(text);
        }
    },
    
    /**
     * Apply casual style transformation
     */
    applyCasualStyle(text) {
        let result = text;
        
        // Add contractions
        result = result
            .replace(/\b(it is)\b/gi, "it's")
            .replace(/\b(that is)\b/gi, "that's")
            .replace(/\b(there is)\b/gi, "there's")
            .replace(/\b(he is)\b/gi, "he's")
            .replace(/\b(she is)\b/gi, "she's")
            .replace(/\b(what is)\b/gi, "what's")
            .replace(/\b(who is)\b/gi, "who's")
            .replace(/\b(I am)\b/gi, "I'm")
            .replace(/\b(they are)\b/gi, "they're")
            .replace(/\b(we are)\b/gi, "we're")
            .replace(/\b(you are)\b/gi, "you're")
            .replace(/\b(will not)\b/gi, "won't")
            .replace(/\b(cannot)\b/gi, "can't")
            .replace(/\b(do not)\b/gi, "don't")
            .replace(/\b(does not)\b/gi, "doesn't")
            .replace(/\b(did not)\b/gi, "didn't")
            .replace(/\b(has not)\b/gi, "hasn't")
            .replace(/\b(have not)\b/gi, "haven't")
            .replace(/\b(would not)\b/gi, "wouldn't")
            .replace(/\b(could not)\b/gi, "couldn't")
            .replace(/\b(should not)\b/gi, "shouldn't");
        
        // Add casual filler words
        if (Math.random() < 0.6) {
            const fillerWords = ["basically", "like", "actually", "pretty much", "kinda", "sort of"];
            const filler = fillerWords[Math.floor(Math.random() * fillerWords.length)];
            
            // Add filler to beginning of text sometimes
            if (Math.random() < 0.5) {
                result = filler + ", " + result.charAt(0).toLowerCase() + result.slice(1);
            } else {
                // Add filler in the middle
                const words = result.split(' ');
                if (words.length > 5) {
                    const insertPosition = Math.floor(words.length / 2);
                    words.splice(insertPosition, 0, filler);
                    result = words.join(' ');
                }
            }
        }
        
        // Simplify vocabulary
        result = result
            .replace(/\b(utilize|utilization)\b/gi, "use")
            .replace(/\b(implement|implementation)\b/gi, "use")
            .replace(/\b(sufficient)\b/gi, "enough")
            .replace(/\b(numerous)\b/gi, "many")
            .replace(/\b(obtain)\b/gi, "get")
            .replace(/\b(regarding)\b/gi, "about")
            .replace(/\b(initial)\b/gi, "first")
            .replace(/\b(demonstrate)\b/gi, "show")
            .replace(/\b(additional)\b/gi, "more")
            .replace(/\b(subsequently)\b/gi, "later")
            .replace(/\b(furthermore)\b/gi, "also")
            .replace(/\b(consequently)\b/gi, "so");
        
        return result;
    },
    
    /**
     * Apply formal style transformation
     */
    applyFormalStyle(text) {
        let result = text;
        
        // Remove contractions
        result = result
            .replace(/\b(it's)\b/gi, "it is")
            .replace(/\b(that's)\b/gi, "that is")
            .replace(/\b(there's)\b/gi, "there is")
            .replace(/\b(he's)\b/gi, "he is")
            .replace(/\b(she's)\b/gi, "she is")
            .replace(/\b(what's)\b/gi, "what is")
            .replace(/\b(who's)\b/gi, "who is")
            .replace(/\b(I'm)\b/gi, "I am")
            .replace(/\b(they're)\b/gi, "they are")
            .replace(/\b(we're)\b/gi, "we are")
            .replace(/\b(you're)\b/gi, "you are")
            .replace(/\b(won't)\b/gi, "will not")
            .replace(/\b(can't)\b/gi, "cannot")
            .replace(/\b(don't)\b/gi, "do not")
            .replace(/\b(doesn't)\b/gi, "does not")
            .replace(/\b(didn't)\b/gi, "did not")
            .replace(/\b(hasn't)\b/gi, "has not")
            .replace(/\b(haven't)\b/gi, "have not")
            .replace(/\b(wouldn't)\b/gi, "would not")
            .replace(/\b(couldn't)\b/gi, "could not")
            .replace(/\b(shouldn't)\b/gi, "should not");
        
        // Add formal transitions
        if (Math.random() < 0.5) {
            const transitions = [
                "Furthermore, ",
                "Moreover, ",
                "In addition, ",
                "Consequently, ",
                "Nevertheless, ",
                "Therefore, ",
                "Subsequently, "
            ];
            
            const transition = transitions[Math.floor(Math.random() * transitions.length)];
            result = transition + result.charAt(0).toLowerCase() + result.slice(1);
        }
        
        // Enhance vocabulary
        result = result
            .replace(/\b(good)\b/gi, "excellent")
            .replace(/\b(bad)\b/gi, "unfavorable")
            .replace(/\b(big)\b/gi, "substantial")
            .replace(/\b(small)\b/gi, "minimal")
            .replace(/\b(use)\b/gi, "utilize")
            .replace(/\b(make)\b/gi, "construct")
            .replace(/\b(think)\b/gi, "consider")
            .replace(/\b(get)\b/gi, "acquire")
            .replace(/\b(show)\b/gi, "demonstrate")
            .replace(/\b(help)\b/gi, "facilitate")
            .replace(/\b(start)\b/gi, "initiate")
            .replace(/\b(end)\b/gi, "conclude");
        
        return result;
    },
    
    /**
     * Apply enthusiastic style transformation
     */
    applyEnthusiasticStyle(text) {
        let result = text;
        
        // Add exclamation points
        result = result.replace(/\./g, (match) => Math.random() < 0.6 ? "!" : match);
        
        // Add enthusiastic adverbs and adjectives
        result = result
            .replace(/\b(good)\b/gi, "amazing")
            .replace(/\b(nice)\b/gi, "fantastic")
            .replace(/\b(interesting)\b/gi, "fascinating")
            .replace(/\b(important)\b/gi, "crucial");
        
        // Add enthusiastic interjections
        if (Math.random() < 0.7) {
            const interjections = ["Wow!", "Amazing!", "Incredible!", "Awesome!"];
            const interjection = interjections[Math.floor(Math.random() * interjections.length)];
            result = interjection + " " + result;
        }
        
        return result;
    },
    
    /**
     * Apply thoughtful style transformation
     */
    applyThoughtfulStyle(text) {
        let result = text;
        
        // Add thoughtful transitions
        if (Math.random() < 0.6) {
            const transitions = [
                "I think ",
                "I believe ",
                "In my view, ",
                "It seems that ",
                "Perhaps ",
                "Interestingly, "
            ];
            
            const transition = transitions[Math.floor(Math.random() * transitions.length)];
            result = transition + result.charAt(0).toLowerCase() + result.slice(1);
        }
        
        // Add pauses (ellipses)
        if (Math.random() < 0.4) {
            const words = result.split(' ');
            if (words.length > 5) {
                const insertPosition = Math.floor(words.length / 2);
                words[insertPosition] = words[insertPosition] + "...";
                result = words.join(' ');
            }
        }
        
        // Add reflective questions
        if (Math.random() < 0.5) {
            const questions = [
                " Don't you think?",
                " Wouldn't you agree?",
                " Isn't that interesting?",
                " What do you think about that?"
            ];
            
            const question = questions[Math.floor(Math.random() * questions.length)];
            
            if (result.endsWith('.')) {
                result = result.slice(0, -1) + question;
            } else {
                result = result + question;
            }
        }
        
        return result;
    },
    
    /**
     * Add human inconsistencies to text
     */
    addHumanInconsistencies(text, strength) {
        // Skip for short text
        if (text.length < 50) return text;
        
        let result = text;
        
        // Add self-corrections based on strength
        if (strength > 5 && Math.random() < 0.3) {
            const corrections = [
                { regex: /\b(always)\b/gi, replace: "always—well, not always, but often" },
                { regex: /\b(never)\b/gi, replace: "never... actually, maybe sometimes, but rarely" },
                { regex: /\b(everyone)\b/gi, replace: "everyone—well, most people anyway" },
                { regex: /\b(definitely)\b/gi, replace: "definitely... or probably, I'm pretty sure" }
            ];
            
            // Apply one correction
            const correction = corrections[Math.floor(Math.random() * corrections.length)];
            if (result.match(correction.regex)) {
                result = result.replace(correction.regex, correction.replace);
            }
        }
        
        // Add thought shifts based on strength
        if (strength > 6 && Math.random() < 0.3) {
            const thoughtShifts = [
                " Actually, thinking about it differently, ",
                " Wait, let me rephrase that. ",
                " Hmm, another way to look at this is ",
                " On second thought, "
            ];
            
            const shift = thoughtShifts[Math.floor(Math.random() * thoughtShifts.length)];
            
            // Find a good spot to add the thought shift
            const sentences = result.match(/[^.!?]+[.!?]+/g) || [result];
            if (sentences.length > 2) {
                const insertPosition = Math.floor(sentences.length / 2);
                sentences[insertPosition] = shift + sentences[insertPosition].trim();
                result = sentences.join(' ');
            }
        }
        
        // Add parenthetical asides
        if (strength > 4 && Math.random() < 0.4) {
            const asides = [
                " (at least that's what I think)",
                " (though I could be wrong)",
                " (based on my experience)",
                " (or so I've heard)",
                " (which makes sense)",
                " (if that makes sense)"
            ];
            
            const aside = asides[Math.floor(Math.random() * asides.length)];
            
            // Find a good spot to add the aside
            const sentences = result.match(/[^.!?]+[.!?]+/g) || [result];
            if (sentences.length > 0) {
                const insertPosition = Math.floor(Math.random() * sentences.length);
                sentences[insertPosition] = sentences[insertPosition].replace(/([.!?]+)$/, `${aside}$1`);
                result = sentences.join(' ');
            }
        }
        
        return result;
    },
    
    /**
     * Vary vocabulary to break AI patterns
     */
    varyVocabulary(text, strength) {
        // Skip for short text
        if (text.length < 50) return text;
        
        let result = text;
        
        // Word pairs to vary (formal/informal)
        const wordPairs = [
            { formal: "utilize", casual: "use" },
            { formal: "demonstrate", casual: "show" },
            { formal: "sufficient", casual: "enough" },
            { formal: "purchase", casual: "buy" },
            { formal: "inquire", casual: "ask" },
            { formal: "comprehend", casual: "understand" },
            { formal: "obtain", casual: "get" },
            { formal: "require", casual: "need" },
            { formal: "commence", casual: "start" },
            { formal: "terminate", casual: "end" },
            { formal: "observe", casual: "see" },
            { formal: "consume", casual: "eat" }
        ];
        
        // Number of words to replace based on strength
        const replacements = Math.min(3, Math.ceil(strength / 3));
        
        // Shuffle the word pairs
        const shuffledPairs = [...wordPairs].sort(() => Math.random() - 0.5);
        
        // Apply replacements
        for (let i = 0; i < replacements; i++) {
            if (i >= shuffledPairs.length) break;
            
            const pair = shuffledPairs[i];
            
            // Sometimes replace formal with casual
            if (Math.random() < 0.5) {
                const regex = new RegExp(`\\b${pair.formal}\\b`, 'gi');
                if (result.match(regex)) {
                    result = result.replace(regex, pair.casual);
                }
            } 
            // Sometimes replace casual with formal
            else {
                const regex = new RegExp(`\\b${pair.casual}\\b`, 'gi');
                if (result.match(regex)) {
                    result = result.replace(regex, pair.formal);
                }
            }
        }
        
        return result;
    },
    
    /**
     * Reassemble text from transformed units
     */
    reassembleText(units, settings) {
        // Process paragraph breaks
        let result = '';
        let currentParagraph = '';
        
        units.forEach(unit => {
            if (unit === '[PARA]') {
                // End current paragraph and start a new one
                result += currentParagraph.trim() + '\n\n';
                currentParagraph = '';
            } else {
                // Add unit to current paragraph
                currentParagraph += unit + ' ';
            }
        });
        
        // Add final paragraph
        if (currentParagraph.trim()) {
            result += currentParagraph.trim();
        }
        
        // Ensure proper spacing
        result = result.replace(/\s+/g, ' ').trim();
        
        // Add occasional one-sentence paragraphs for high strength
        if (settings.strength > 7) {
            const sentences = result.match(/[^.!?]+[.!?]+/g) || [result];
            if (sentences.length > 5) {
                const randomIndex = Math.floor(Math.random() * (sentences.length - 2)) + 1;
                const beforeSentence = sentences.slice(0, randomIndex).join(' ');
                const shortParagraph = sentences[randomIndex];
                const afterSentence = sentences.slice(randomIndex + 1).join(' ');
                
                result = beforeSentence + '\n\n' + shortParagraph + '\n\n' + afterSentence;
            }
        }
        
        return result;
    },
    
    /**
     * Apply style-specific final touches
     */
    applyStyleTouches(text, settings) {
        let result = text;
        
        switch (settings.style) {
            case 'casual':
                // Add casual ending
                if (Math.random() < 0.4) {
                    const endings = [
                        " Anyway, that's my take on it.",
                        " So yeah, that's about it.",
                        " That's pretty much the gist of it.",
                        " Hope that makes sense!"
                    ];
                    
                    const ending = endings[Math.floor(Math.random() * endings.length)];
                    result = result + ending;
                }
                break;
                
            case 'formal':
                // Add formal conclusion
                if (Math.random() < 0.4) {
                    const conclusions = [
                        " In conclusion, the aforementioned points demonstrate the significance of this matter.",
                        " To summarize, these considerations warrant further examination.",
                        " Therefore, these factors should be taken into account in future analyses."
                    ];
                    
                    const conclusion = conclusions[Math.floor(Math.random() * conclusions.length)];
                    result = result + conclusion;
                }
                break;
                
            case 'enthusiastic':
                // Add enthusiastic ending
                if (Math.random() < 0.5) {
                    const endings = [
                        " I'm so excited about this!",
                        " Isn't that amazing?!",
                        " This is going to be awesome!",
                        " I can't wait to see what happens next!"
                    ];
                    
                    const ending = endings[Math.floor(Math.random() * endings.length)];
                    result = result + ending;
                }
                break;
                
            case 'thoughtful':
                // Add thoughtful ending
                if (Math.random() < 0.5) {
                    const endings = [
                        " It's something worth pondering...",
                        " Perhaps there's more to consider here.",
                        " I'm still thinking through the implications.",
                        " I wonder how this will evolve over time."
                    ];
                    
                    const ending = endings[Math.floor(Math.random() * endings.length)];
                    result = result + ending;
                }
                break;
        }
        
        return result;
    },
    
    /**
     * Add human markers like typos and emojis
     */
    addHumanMarkers(text, settings) {
        let result = text;
        
        // Add typos based on strength
        if (settings.allowTypos && settings.strength > 3) {
            result = this.addTypos(result, settings.strength);
        }
        
        // Add emojis if enabled
        if (settings.allowEmojis) {
            result = this.addEmojis(result, settings.style);
        }
        
        return result;
    },
    
    /**
     * Add realistic typos
     */
    addTypos(text, strength) {
        // Common misspellings
        const commonMisspellings = {
            'their': 'thier',
            'receive': 'recieve',
            'definitely': 'definately',
            'separate': 'seperate',
            'occurrence': 'occurence',
            'necessary': 'neccessary',
            'a lot': 'alot',
            'beginning': 'begining',
            'believe': 'beleive',
            'government': 'goverment',
            'immediately': 'immediatly',
            'independent': 'independant',
            'relevant': 'relevent',
            'successful': 'successfull',
            'until': 'untill',
            'weird': 'wierd'
        };
        
        // Determine how many typos to add based on strength and text length
        const words = text.split(' ');
        const typoCount = Math.min(
            Math.floor(words.length * 0.01 * strength),
            3 // Maximum 3 typos
        );
        
        // Skip if text is too short
        if (words.length < 20) return text;
        
        // Track which words we've modified
        const modifiedIndices = new Set();
        
        // Add common misspellings
        for (let i = 0; i < typoCount; i++) {
            // Find a word to misspell
            let attempts = 0;
            let index;
            
            while (attempts < 15) {
                index = Math.floor(Math.random() * words.length);
                
                // Skip if already modified or too short
                if (modifiedIndices.has(index) || words[index].length < 5) {
                    attempts++;
                    continue;
                }
                
                const word = words[index].toLowerCase().replace(/[^a-z]/g, '');
                
                // Check if this word has a common misspelling
                if (commonMisspellings[word]) {
                    const originalWord = words[index];
                    const punctuation = originalWord.match(/[^\w\s]$/);
                    const misspelled = commonMisspellings[word] + (punctuation ? punctuation[0] : '');
                    
                    words[index] = misspelled;
                    modifiedIndices.add(index);
                    break;
                }
                
                // If no common misspelling, try creating a typo
                if (words[index].length > 4) {
                    const typoType = Math.floor(Math.random() * 3);
                    const word = words[index];
                    
                    switch (typoType) {
                        case 0: // Transposed letters
                            const pos = Math.floor(Math.random() * (word.length - 2)) + 1;
                            words[index] = word.substring(0, pos) + 
                                          word.charAt(pos + 1) + 
                                          word.charAt(pos) + 
                                          word.substring(pos + 2);
                            modifiedIndices.add(index);
                            break;
                            
                        case 1: // Missing letter
                                                        const pos2 = Math.floor(Math.random() * (word.length - 1)) + 1;
                            words[index] = word.substring(0, pos2) + word.substring(pos2 + 1);
                            modifiedIndices.add(index);
                            break;
                            
                        case 2: // Double letter
                            const pos3 = Math.floor(Math.random() * (word.length - 1)) + 1;
                            words[index] = word.substring(0, pos3) + 
                                          word.charAt(pos3) + 
                                          word.substring(pos3);
                            modifiedIndices.add(index);
                            break;
                    }
                    
                    break;
                }
                
                attempts++;
            }
        }
        
        // Add a self-correction for one typo
        if (modifiedIndices.size > 0 && Math.random() < 0.4) {
            const correctionIndex = Array.from(modifiedIndices)[0];
            const originalWord = text.split(' ')[correctionIndex];
            const typoWord = words[correctionIndex];
            
            words[correctionIndex] = `${typoWord}* ${originalWord}`;
        }
        
        return words.join(' ');
    },
    
    /**
     * Add emojis based on style
     */
    addEmojis(text, style) {
        const casualEmojis = ['😊', '👍', '😂', '🙌', '💯', '🔥', '👏', '❤️', '😉', '🤔'];
        const enthusiasticEmojis = ['🎉', '🚀', '✨', '💪', '🤩', '😍', '🙏', '💥', '⭐', '🔆'];
        const thoughtfulEmojis = ['🤔', '💭', '📝', '🧠', '💡', '🔍', '📚', '🧐', '⏳', '🌱'];
        const formalEmojis = ['📊', '📈', '✅', '📋', '🔎', '📝', '📌', '🔍', '📎', '📑'];
        
        let emojis;
        switch (style) {
            case 'casual':
                emojis = casualEmojis;
                break;
            case 'enthusiastic':
                emojis = enthusiasticEmojis;
                break;
            case 'thoughtful':
                emojis = thoughtfulEmojis;
                break;
            case 'formal':
                emojis = formalEmojis;
                break;
            default:
                emojis = casualEmojis;
        }
        
        // Add 1-2 emojis at strategic points
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        if (sentences.length < 2) {
            // Just one sentence, add at the end
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            return text.replace(/[.!?]$/, ` ${emoji}$&`);
        }
        
        // Choose 1-2 positions for emojis
        const positions = [];
        positions.push(Math.floor(sentences.length * 0.7)); // Towards the end
        
        if (Math.random() < 0.5 && sentences.length > 4) {
            // Add a second emoji somewhere in the middle
            positions.push(Math.floor(sentences.length * 0.4));
        }
        
        // Add emojis at the chosen positions
        positions.forEach(pos => {
            if (pos < sentences.length) {
                const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                sentences[pos] = sentences[pos].replace(/([.!?]+)$/, ` ${emoji}$1`);
            }
        });
        
        return sentences.join(' ');
    },
    
    /**
     * Apply GPTZero-specific evasion techniques
     */
    applyGPTZeroEvasion(text, settings) {
        // Skip for short text
        if (text.length < 100) return text;
        
        let result = text;
        
        // 1. Break consistent patterns
        result = this.breakConsistentPatterns(result);
        
        // 2. Add human-like inconsistencies in formatting
        result = this.addFormattingInconsistencies(result);
        
        // 3. Add stream-of-consciousness elements
        if (settings.strength > 6) {
            result = this.addStreamOfConsciousness(result);
        }
        
        // 4. Add personal anecdotes
        if (settings.strength > 7) {
            result = this.addPersonalAnecdotes(result);
        }
        
        // 5. Add GPTZero-specific confusion patterns
        if (settings.strength > 8) {
            result = this.addGPTZeroConfusers(result);
        }
        
        return result;
    },
    
    /**
     * Break consistent patterns that GPTZero detects
     */
    breakConsistentPatterns(text) {
        let result = text;
        
        // Break parallel structures
        result = result.replace(/(\w+) is (\w+), (\w+) is (\w+), (\w+) is (\w+)/gi, 
            (match, w1, w2, w3, w4, w5, w6) => 
                `${w1} is ${w2}. ${w3}'s actually ${w4}, and I think ${w5} is probably ${w6}`);
        
        // Break consistent punctuation
        const sentences = result.match(/[^.!?]+[.!?]+/g) || [result];
        if (sentences.length > 2) {
            // Mix up some punctuation
            const modifiedSentences = [...sentences];
            
            // Change some periods to other punctuation
            for (let i = 0; i < modifiedSentences.length; i += 2) {
                if (modifiedSentences[i].endsWith('.')) {
                    if (i % 4 === 0) {
                        modifiedSentences[i] = modifiedSentences[i].slice(0, -1) + '!';
                    } else if (i % 6 === 0) {
                        modifiedSentences[i] = modifiedSentences[i].slice(0, -1) + '?';
                    }
                }
            }
            
            result = modifiedSentences.join(' ');
        }
        
        // Break consistent paragraph structure
        const paragraphs = result.split(/\n\s*\n/);
        if (paragraphs.length > 1) {
            // Make one paragraph significantly shorter
            const shortParaIndex = Math.floor(Math.random() * paragraphs.length);
            const para = paragraphs[shortParaIndex];
            const sentences = para.match(/[^.!?]+[.!?]+/g) || [para];
            
            if (sentences.length > 2) {
                paragraphs[shortParaIndex] = sentences[0] + (sentences.length > 1 ? ' ' + sentences[1] : '');
                result = paragraphs.join('\n\n');
            }
        }
        
        return result;
    },
    
    /**
     * Add human-like formatting inconsistencies
     */
    addFormattingInconsistencies(text) {
        let result = text;
        
        // Inconsistent spacing after punctuation
        if (Math.random() < 0.4) {
            // Sometimes no space after a comma
            result = result.replace(/,\s/g, (match) => Math.random() < 0.2 ? ',' : match);
        }
        
        // Inconsistent use of quotation marks
        if (Math.random() < 0.3 && result.includes('"')) {
            // Mix single and double quotes
            const quotes = ['"', "'"];
            let currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
            
            result = result.replace(/"/g, (match) => {
                currentQuote = currentQuote === '"' ? "'" : '"';
                return currentQuote;
            });
        }
        
        // Inconsistent capitalization of certain words
        if (Math.random() < 0.5) {
            const words = result.split(' ');
            
            for (let i = 0; i < words.length; i++) {
                // Skip first words of sentences
                if (i === 0 || words[i-1].match(/[.!?]$/)) continue;
                
                const word = words[i];
                
                // Randomly capitalize some words that might be proper nouns
                if (word.match(/^(internet|web|google|facebook|twitter|instagram|youtube|tiktok|amazon|netflix)$/i) && Math.random() < 0.5) {
                    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
                }
            }
            
            result = words.join(' ');
        }
        
        return result;
    },
    
    /**
     * Add stream-of-consciousness elements
     */
    addStreamOfConsciousness(text) {
        const streamElements = [
            "... anyway, where was I? Oh right, ",
            "... sorry, got distracted there. Back to ",
            "... hmm, that reminds me... but I should focus on ",
            "... wait, let me think... yes, about ",
            "... actually, scratch that thought. Let's talk about "
        ];
        
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        if (sentences.length < 5) return text;
        
        // Insert a stream element in the middle
        const index = Math.floor(sentences.length / 2);
        const element = streamElements[Math.floor(Math.random() * streamElements.length)];
        
        sentences[index] = element + sentences[index].trim().charAt(0).toLowerCase() + sentences[index].trim().slice(1);
        
        return sentences.join(' ');
    },
    
    /**
     * Add personal anecdotes
     */
    addPersonalAnecdotes(text) {
        const anecdotes = [
            " This reminds me of something that happened to me last year.",
            " I had a similar experience once.",
            " My friend was just talking about this the other day.",
            " I read something about this in a book recently.",
            " This is actually something I've thought about a lot."
        ];
        
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        if (sentences.length < 4) return text;
        
        // Add an anecdote near the end
        const index = Math.floor(sentences.length * 0.75);
        const anecdote = anecdotes[Math.floor(Math.random() * anecdotes.length)];
        
        sentences[index] = sentences[index].trim() + anecdote;
        
        return sentences.join(' ');
    },
    
    /**
     * Add patterns known to confuse GPTZero
     */
    addGPTZeroConfusers(text) {
        // These are specific patterns that tend to confuse GPTZero's detection
        const confusers = [
            // Stream of consciousness
            " (my mind is wandering a bit here) ",
            
            // Self-reference to writing process
            " (sorry if this is getting off-topic) ",
            
            // Informal interjections
            " Hmm, where was I going with this? Oh right. ",
            
            // Metacommentary
            " I'm not explaining this very well, but hopefully you get what I mean. ",
            
            // Hedging language with personal anecdote
            " I remember reading something about this, though I can't recall the exact details. "
        ];
        
        // Choose 1-2 confusers to add
        const confusersToAdd = Math.ceil(Math.random() * 2);
        const shuffledConfusers = [...confusers].sort(() => Math.random() - 0.5);
        
        let result = text;
        
        for (let i = 0; i < confusersToAdd; i++) {
            if (i >= shuffledConfusers.length) break;
            
            // Find a good position to insert the confuser
            const sentences = result.match(/[^.!?]+[.!?]+/g) || [result];
            if (sentences.length < 3) continue;
            
            const insertIndex = Math.floor((sentences.length / 2) + (i * 2));
            if (insertIndex >= sentences.length) continue;
            
            // Insert the confuser in the middle of the sentence
            const words = sentences[insertIndex].split(' ');
            if (words.length < 6) continue;
            
            const insertWordIndex = Math.floor(words.length / 2);
            words.splice(insertWordIndex, 0, shuffledConfusers[i]);
            sentences[insertIndex] = words.join(' ');
            
            result = sentences.join(' ');
        }
        
        return result;
    },
    
    /**
     * Emergency humanization when other methods fail
     */
    emergencyHumanize(text) {
        // Simple transformations that are unlikely to fail
        let result = text;
        
        // 1. Add a personal intro
        const intros = [
            "So here's what I think: ",
            "In my opinion, ",
            "From what I understand, ",
            "Based on what I know, "
        ];
        
        const intro = intros[Math.floor(Math.random() * intros.length)];
        result = intro + result;
        
        // 2. Add a personal conclusion
        const conclusions = [
            " That's my take on it anyway.",
            " At least that's how I see it.",
            " But I could be wrong.",
            " What do you think?"
        ];
        
        const conclusion = conclusions[Math.floor(Math.random() * conclusions.length)];
        result = result + conclusion;
        
        // 3. Add a typo
        const words = result.split(' ');
        if (words.length > 10) {
            const index = Math.floor(Math.random() * words.length);
            const word = words[index];
            
            if (word.length > 4) {
                // Swap two adjacent letters
                const pos = Math.floor(Math.random() * (word.length - 2)) + 1;
                words[index] = word.substring(0, pos) + 
                              word.charAt(pos + 1) + 
                              word.charAt(pos) + 
                              word.substring(pos + 2);
            }
            
            result = words.join(' ');
        }
        
        return result;
    }
};

const HumanizerEngine = {
    humanizeText(text, options) {
        try {
            // For maximum evasion mode, use our specialized functions
            if (options.tier === 'maximumEvasion' || options.strength >= 9) {
                // First apply the GPTZero bypass
                let result = AIDetectorEvasion.bypassGPTZero(text);
                
                // Then enhance perplexity
                result = AIDetectorEvasion.enhancePerplexity(result);
                
                // Finally add human markers
                result = AIDetectorEvasion.addHumanMarkers(result, {
                    allowTypos: true,
                    strength: 10
                });
                
                return result;
            }
            
            // For other modes, use the enhanced standard approach
            const analysis = TextAnalyzer.analyzeText(text);
            let result = Humanizer.humanize(text, {
                strength: options.strength || 7,
                style: options.style || 'casual',
                allowTypos: options.allowMisspellings !== undefined ? options.allowMisspellings : true,
                allowEmojis: options.allowEmojis !== undefined ? options.allowEmojis : false,
                gptzeroMode: true
            });
            
            // Apply additional evasion techniques
            if (options.strength > 6) {
                result = AIDetectorEvasion.applyEvasionTechniques(result, {
                    strength: options.strength
                });
            }
            
            return result;
        } catch (e) {
            console.error("Error in humanization process:", e);
            return this.emergencyHumanize(text);
        }
    },
    
    // Emergency humanization when other methods fail
    emergencyHumanize(text) {
        try {
            // Simple transformations that are unlikely to fail
            let result = text;
            
            // 1. Add a personal intro
            const intros = [
                "So here's what I think: ",
                "In my opinion, ",
                "From what I understand, ",
                "Based on what I know, "
            ];
            
            const intro = intros[Math.floor(Math.random() * intros.length)];
            result = intro + result;
            
            // 2. Add a personal conclusion
            const conclusions = [
                " That's my take on it anyway.",
                " At least that's how I see it.",
                " But I could be wrong.",
                " What do you think?"
            ];
            
            const conclusion = conclusions[Math.floor(Math.random() * conclusions.length)];
            result = result + conclusion;
            
            return result;
        } catch (e) {
            console.error("Emergency humanization failed:", e);
            // Last resort - return original text with minimal changes
            return "In my view, " + text + " That's my perspective.";
        }
    }
};

