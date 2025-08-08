/**
 * Writing Styles Module
 * Contains various writing style patterns and transformations
 */

const WritingStyles = {
    casual: {
        transitions: [
            "So", "Anyway", "Also", "Plus", "And then", "But", "Actually", 
            "Honestly", "Basically", "I mean", "Like", "Y'know", "Thing is",
            "The cool part is", "What's interesting is"
        ],
        sentenceStarters: [
            "I think", "I feel like", "Seems like", "From what I can tell",
            "It looks like", "Probably", "Maybe", "Honestly,"
        ],
        fillers: [
            "like", "sort of", "kind of", "pretty much", "basically", "really",
            "actually", "literally", "to be honest", "honestly", "I mean"
        ],
        punctuationPatterns: [
            { end: "..." },
            { end: "!" },
            { end: "?!" },
            { mid: " - " },
            { mid: ", like, " }
        ],
        contractions: true,
        sentenceLengthVariance: "high",
        vocabularyLevel: "simple"
    },
    
    formal: {
        transitions: [
            "Furthermore", "Moreover", "In addition", "Consequently", "Nevertheless",
            "Therefore", "Thus", "Subsequently", "Indeed", "Accordingly",
            "Conversely", "Alternatively", "Similarly", "Specifically"
        ],
        sentenceStarters: [
            "It is evident that", "Research suggests that", "One could argue that",
            "It should be noted that", "Upon examination", "When considering",
            "As demonstrated by", "As illustrated by"
        ],
        fillers: [],
        punctuationPatterns: [
            { mid: "; " },
            { mid: ": " },
            { mid: ", therefore, " },
            { mid: ", specifically, " }
        ],
        contractions: false,
        sentenceLengthVariance: "moderate",
        vocabularyLevel: "advanced"
    },
    
    enthusiastic: {
        transitions: [
            "And guess what?", "The best part is", "What's amazing is",
            "Incredibly,", "Surprisingly,", "You won't believe this, but",
            "Here's the exciting part:", "Even better,"
        ],
        sentenceStarters: [
            "I'm so excited about", "It's fantastic that", "How amazing is it that",
            "I love how", "Isn't it great that", "The awesome thing about",
            "What's really cool is"
        ],
        fillers: [
            "really", "super", "totally", "absolutely", "incredibly", "amazingly"
        ],
        punctuationPatterns: [
            { end: "!" },
            { end: "!!" },
            { mid: " - amazing! - " },
            { mid: " (so cool!) " }
        ],
        contractions: true,
        sentenceLengthVariance: "high",
        vocabularyLevel: "moderate"
    },
    
    thoughtful: {
        transitions: [
            "Perhaps", "Interestingly,", "Notably,", "Considering this,",
            "On reflection,", "It's worth considering that", "One might wonder",
            "This raises the question of", "It's nuanced, but"
        ],
        sentenceStarters: [
            "I wonder if", "It seems that", "One could argue that",
            "When we consider", "If we look deeper", "The complexity lies in",
            "What's fascinating is"
        ],
        fillers: [
            "somewhat", "rather", "relatively", "arguably", "conceivably", "ostensibly"
        ],
        punctuationPatterns: [
            { end: "..." },
            { mid: " — " },
            { mid: "; perhaps " },
            { mid: " (though one could argue otherwise) " }
        ],
        contractions: true,
        sentenceLengthVariance: "high",
        vocabularyLevel: "advanced"
    },
    
    applyStyle(text, style, strength) {
        const selectedStyle = this[style] || this.casual;
        let result = text;
        
        // Apply style transformations based on strength
        if (strength > 3) {
            // Add style-specific transitions
            result = this.addStyleTransitions(result, selectedStyle, strength);
        }
        
        if (strength > 5) {
            // Add style-specific sentence starters
            result = this.addStyleSentenceStarters(result, selectedStyle, strength);
        }
        
        if (strength > 4) {
            // Add style-specific fillers
            result = this.addStyleFillers(result, selectedStyle, strength);
        }
        
        if (strength > 6) {
            // Apply punctuation patterns
            result = this.applyPunctuationPatterns(result, selectedStyle, strength);
        }
        
        // Apply contractions based on style
        if (selectedStyle.contractions) {
            result = this.applyContractions(result);
        } else {
            result = this.removeContractions(result);
        }
        
        // Adjust sentence length variance
        result = this.adjustSentenceLengthVariance(result, selectedStyle.sentenceLengthVariance);
        
        // Adjust vocabulary level
        result = this.adjustVocabularyLevel(result, selectedStyle.vocabularyLevel, strength);
        
        return result;
    },
    
    addStyleTransitions(text, style, strength) {
        if (!style.transitions || style.transitions.length === 0) return text;
        
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        if (sentences.length < 3) return text;
        
        // Determine how many transitions to add based on strength
        const transitionCount = Math.min(
            Math.floor(sentences.length / 3),
            Math.ceil(strength / 3)
        );
        
        // Track which sentences already have transitions
        const modifiedIndices = new Set();
        
        for (let i = 0; i < transitionCount; i++) {
            // Find a sentence to modify (not the first one)
            let index;
            let attempts = 0;
            do {
                index = Math.floor(Math.random() * (sentences.length - 1)) + 1;
                attempts++;
            } while (modifiedIndices.has(index) && attempts < 10);
            
            if (attempts >= 10) break; // Avoid infinite loop
            
            modifiedIndices.add(index);
            
            // Add a random transition to the beginning of the sentence
            const transition = style.transitions[Math.floor(Math.random() * style.transitions.length)];
            sentences[index] = transition + " " + sentences[index].trim().charAt(0).toLowerCase() + sentences[index].trim().slice(1);
        }
        
        return sentences.join(' ');
    },
    
    addStyleSentenceStarters(text, style, strength) {
        if (!style.sentenceStarters || style.sentenceStarters.length === 0) return text;
        
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        if (sentences.length < 2) return text;
        
        // Determine how many sentence starters to add based on strength
        const starterCount = Math.min(
            Math.floor(sentences.length / 4),
            Math.ceil(strength / 4)
        );
        
        // Track which sentences already have starters
        const modifiedIndices = new Set();
        
        for (let i = 0; i < starterCount; i++) {
            // Find a sentence to modify
            let index;
            let attempts = 0;
            do {
                index = Math.floor(Math.random() * sentences.length);
                attempts++;
            } while (modifiedIndices.has(index) && attempts < 10);
            
            if (attempts >= 10) break; // Avoid infinite loop
            
            modifiedIndices.add(index);
            
            // Add a random starter to the beginning of the sentence
            const starter = style.sentenceStarters[Math.floor(Math.random() * style.sentenceStarters.length)];
            sentences[index] = starter + ", " + sentences[index].trim().charAt(0).toLowerCase() + sentences[index].trim().slice(1);
        }
        
        return sentences.join(' ');
    },
    
    addStyleFillers(text, style, strength) {
        if (!style.fillers || style.fillers.length === 0) return text;
        
        let result = text;
        const fillerCount = Math.ceil(strength / 3);
        
        for (let i = 0; i < fillerCount; i++) {
            const filler = style.fillers[Math.floor(Math.random() * style.fillers.length)];
            
            // Find positions where we can insert fillers (after commas or between clauses)
            const positions = [];
            const regex = /,\s|\.\s|\?\s|\!\s/g;
            let match;
            
            while ((match = regex.exec(result)) !== null) {
                positions.push(match.index + match[0].length);
            }
            
            if (positions.length === 0) continue;
            
            // Choose a random position and insert the filler
            const position = positions[Math.floor(Math.random() * positions.length)];
            result = result.slice(0, position) + filler + " " + result.slice(position);
        }
        
        return result;
    },
    
    applyPunctuationPatterns(text, style, strength) {
        if (!style.punctuationPatterns || style.punctuationPatterns.length === 0) return text;
        
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        if (sentences.length < 2) return text;
        
        // Determine how many patterns to apply based on strength
        const patternCount = Math.min(
            Math.floor(sentences.length / 3),
            Math.ceil(strength / 3)
        );
        
        // Track which sentences are already modified
        const modifiedIndices = new Set();
        
        for (let i = 0; i < patternCount; i++) {
            // Find a sentence to modify
            let index;
            let attempts = 0;
            do {
                index = Math.floor(Math.random() * sentences.length);
                attempts++;
            } while (modifiedIndices.has(index) && attempts < 10);
            
            if (attempts >= 10) break; // Avoid infinite loop
            
            modifiedIndices.add(index);
            
            // Choose a random pattern
            const pattern = style.punctuationPatterns[Math.floor(Math.random() * style.punctuationPatterns.length)];
            
            if (pattern.end) {
                // Replace the ending punctuation
                sentences[index] = sentences[index].replace(/[.!?]+$/, pattern.end);
            } else if (pattern.mid) {
                // Insert the pattern in the middle of the sentence
                const words = sentences[index].split(' ');
                if (words.length < 5) continue;
                
                const insertPosition = Math.floor(words.length / 2);
                words.splice(insertPosition, 0, pattern.mid);
                sentences[index] = words.join(' ');
            }
        }
        
        return sentences.join(' ');
    },
    
    applyContractions(text) {
        return text
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
    },
    
    removeContractions(text) {
        return text
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
    },
    
    adjustSentenceLengthVariance(text, varianceLevel) {
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        if (sentences.length < 3) return text;
        
        // Apply different variance strategies based on level
        switch (varianceLevel) {
            case "high":
                return this.createHighVariance(sentences);
            case "moderate":
                return this.createModerateVariance(sentences);
            case "low":
                return this.createLowVariance(sentences);
            default:
                return text;
        }
    },
    
    createHighVariance(sentences) {
        // Create high variance by making some sentences very short and others longer
        for (let i = 0; i < sentences.length; i++) {
            if (i % 3 === 0 && sentences[i].split(' ').length > 8) {
                // Shorten some sentences dramatically
                const words = sentences[i].split(' ');
                const endPunctuation = sentences[i].match(/[.!?]+$/)[0];
                sentences[i] = words.slice(0, 4).join(' ') + endPunctuation;
            } else if (i % 5 === 0 && i < sentences.length - 1) {
                // Combine some sentences
                sentences[i] = sentences[i].replace(/[.!?]+$/, ", ") + sentences[i+1].trim();
                sentences.splice(i+1, 1);
            }
        }
        
        return sentences.join(' ');
    },
    
    createModerateVariance(sentences) {
        // Create moderate variance by adjusting some sentences
        for (let i = 0; i < sentences.length; i++) {
            if (i % 4 === 0 && sentences[i].split(' ').length > 12) {
                // Shorten some long sentences
                const words = sentences[i].split(' ');
                const endPunctuation = sentences[i].match(/[.!?]+$/)[0];
                sentences[i] = words.slice(0, 8).join(' ') + endPunctuation;
            }
        }
        
        return sentences.join(' ');
    },
    
    createLowVariance(sentences) {
        // Create low variance by making sentences more similar in length
        const avgLength = sentences.reduce((sum, s) => sum + s.split(' ').length, 0) / sentences.length;
        
        for (let i = 0; i < sentences.length; i++) {
            const words = sentences[i].split(' ');
            if (words.length > avgLength * 1.5) {
                // Shorten very long sentences
                const endPunctuation = sentences[i].match(/[.!?]+$/)[0];
                sentences[i] = words.slice(0, Math.ceil(avgLength)).join(' ') + endPunctuation;
            }
        }
        
        return sentences.join(' ');
    },
    
    adjustVocabularyLevel(text, level, strength) {
        // Skip if strength is too low
        if (strength < 4) return text;
        
        // Define vocabulary replacements for different levels
        const vocabularyReplacements = {
            "simple": {
                "utilize": "use",
                "implement": "use",
                "sufficient": "enough",
                "numerous": "many",
                "obtain": "get",
                "regarding": "about",
                "initial": "first",
                "demonstrate": "show",
                "additional": "more",
                "subsequently": "later",
                "furthermore": "also",
                "consequently": "so",
                "approximately": "about",
                "facilitate": "help",
                "endeavor": "try",
                "commence": "start",
                "terminate": "end",
                "ascertain": "find out",
                "elucidate": "explain",
                "expedite": "speed up"
            },
            "moderate": {
                // Keep some words simple, others more complex
                "use": "utilize",
                "get": "obtain",
                "show": "demonstrate",
                "help": "assist",
                "try": "attempt",
                "start": "begin",
                "end": "conclude",
                "find out": "determine",
                "explain": "clarify",
                "speed up": "accelerate"
            },
            "advanced": {
                "use": "utilize",
                "enough": "sufficient",
                "many": "numerous",
                "get": "obtain",
                "about": "regarding",
                "first": "initial",
                "show": "demonstrate",
                "more": "additional",
                "later": "subsequently",
                "also": "furthermore",
                "so": "consequently",
                "about": "approximately",
                "help": "facilitate",
                "try": "endeavor",
                "start": "commence",
                "end": "terminate",
                "find out": "ascertain",
                "explain": "elucidate",
                "speed up": "expedite"
            }
        };
        
        const replacements = vocabularyReplacements[level] || {};
        let result = text;
        
        // Apply replacements with probability based on strength
        Object.keys(replacements).forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            if (result.match(regex) && Math.random() < (strength / 10)) {
                result = result.replace(regex, replacements[word]);
            }
        });
        
        return result;
    }
};
