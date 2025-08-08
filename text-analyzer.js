/**
 * Text Analysis Module
 * Analyzes input text to determine optimal humanization strategy
 */

const TextAnalyzer = {
    analyzeText(text) {
        return {
            complexity: this.measureComplexity(text),
            formalityLevel: this.measureFormality(text),
            emotionalTone: this.detectEmotionalTone(text),
            topicCategory: this.detectTopic(text),
            sentenceStructure: this.analyzeSentenceStructure(text)
        };
    },
    
    // Optimize the measureComplexity function in text-analyzer.js
    measureComplexity(text) {
        // Cache regex matches for better performance
        const words = text.match(/\b\w+\b/g) || [];
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        
        // Use more efficient calculation
        const avgWordsPerSentence = words.length / sentences.length;
        const avgWordLength = words.join('').length / words.length;
        
        // Calculate complexity score (0-10)
        let complexityScore = (avgWordsPerSentence * 0.5) + (avgWordLength * 1.5);
        complexityScore = Math.min(10, Math.max(1, complexityScore));
        
        // Use simple comparison instead of multiple conditions
        if (complexityScore < 4) return "simple";
        if (complexityScore < 7) return "moderate";
        return "complex";
    },
    
    measureFormality(text) {
        // Check for formal vs informal indicators
        const formalIndicators = [
            /\b(therefore|furthermore|consequently|thus|hence|accordingly)\b/gi,
            /\b(it is|there are|this is)\b/gi,
            /\b(necessary|sufficient|appropriate|optimal)\b/gi,
            /\b(analyze|examine|investigate|determine)\b/gi
        ];
        
        const informalIndicators = [
            /\b(so|anyway|basically|like|you know|kind of|sort of)\b/gi,
            /\b(stuff|thing|cool|awesome|great|huge)\b/gi,
            /\b(I think|I feel|I guess)\b/gi,
            /\b(can't|won't|don't|isn't|aren't)\b/gi,
            /\b(really|very|totally|literally)\b/gi
        ];
        
        let formalCount = 0;
        let informalCount = 0;
        
        formalIndicators.forEach(regex => {
            const matches = text.match(regex) || [];
            formalCount += matches.length;
        });
        
        informalIndicators.forEach(regex => {
            const matches = text.match(regex) || [];
            informalCount += matches.length;
        });
        
        // Calculate formality score
        const totalWords = text.match(/\b\w+\b/g)?.length || 1;
        const formalityScore = ((formalCount * 2) - informalCount) / Math.sqrt(totalWords);
        
        if (formalityScore > 0.5) return "formal";
        if (formalityScore < -0.5) return "casual";
        return "neutral";
    },
    
    detectEmotionalTone(text) {
        const positiveWords = [
            /\b(good|great|excellent|amazing|wonderful|fantastic|brilliant|outstanding)\b/gi,
            /\b(happy|joy|excited|thrilled|delighted|pleased|satisfied)\b/gi,
            /\b(success|achievement|accomplish|benefit|advantage|improve)\b/gi
        ];
        
        const negativeWords = [
            /\b(bad|terrible|awful|horrible|poor|disappointing|unfortunate)\b/gi,
            /\b(sad|unhappy|upset|angry|frustrated|annoyed|disappointed)\b/gi,
            /\b(problem|issue|challenge|difficult|hard|trouble|fail)\b/gi
        ];
        
        const neutralWords = [
            /\b(consider|evaluate|assess|analyze|examine|review|study)\b/gi,
            /\b(appear|seem|suggest|indicate|imply|show|demonstrate)\b/gi,
            /\b(however|nevertheless|although|despite|while|though)\b/gi
        ];
        
        let positiveCount = 0;
        let negativeCount = 0;
        let neutralCount = 0;
        
        positiveWords.forEach(regex => {
            const matches = text.match(regex) || [];
            positiveCount += matches.length;
        });
        
        negativeWords.forEach(regex => {
            const matches = text.match(regex) || [];
            negativeCount += matches.length;
        });
        
        neutralWords.forEach(regex => {
            const matches = text.match(regex) || [];
            neutralCount += matches.length;
        });
        
        // Determine dominant tone
        if (positiveCount > negativeCount && positiveCount > neutralCount) {
            return "positive";
        } else if (negativeCount > positiveCount && negativeCount > neutralCount) {
            return "negative";
        } else if (neutralCount > positiveCount && neutralCount > negativeCount) {
            return "analytical";
        } else {
            return "mixed";
        }
    },
    
    detectTopic(text) {
        // Simple topic detection based on keyword frequency
        const topics = {
            "technology": /\b(technology|computer|software|hardware|digital|internet|online|app|website|code|program)\b/gi,
            "business": /\b(business|company|market|industry|economic|finance|investment|profit|revenue|customer|client)\b/gi,
            "science": /\b(science|scientific|research|experiment|theory|hypothesis|data|evidence|study|analysis)\b/gi,
            "health": /\b(health|medical|doctor|patient|disease|treatment|therapy|medicine|hospital|clinic|symptom)\b/gi,
            "education": /\b(education|school|student|teacher|learn|teach|study|academic|university|college|course)\b/gi,
            "politics": /\b(politics|government|policy|election|vote|party|president|congress|law|legislation|political)\b/gi,
            "arts": /\b(art|music|film|movie|book|literature|culture|creative|design|artist|author|director)\b/gi
        };
        
        let topicCounts = {};
        
        Object.keys(topics).forEach(topic => {
            const matches = text.match(topics[topic]) || [];
            topicCounts[topic] = matches.length;
        });
        
        // Find topic with highest count
        let maxCount = 0;
        let dominantTopic = "general";
        
        Object.keys(topicCounts).forEach(topic => {
            if (topicCounts[topic] > maxCount) {
                maxCount = topicCounts[topic];
                dominantTopic = topic;
            }
        });
        
        return dominantTopic;
    },
    
    analyzeSentenceStructure(text) {
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        
        // Count different sentence types
        let questionCount = 0;
        let exclamationCount = 0;
        let complexCount = 0;
        
        sentences.forEach(sentence => {
            if (sentence.trim().endsWith('?')) {
                questionCount++;
            } else if (sentence.trim().endsWith('!')) {
                exclamationCount++;
            }
            
            // Check for complex sentences (containing conjunctions)
            if (/\b(and|but|or|because|although|though|since|while|if|unless)\b/i.test(sentence)) {
                complexCount++;
            }
        });
        
        const totalSentences = sentences.length;
        
        return {
            questionRatio: questionCount / totalSentences,
            exclamationRatio: exclamationCount / totalSentences,
            complexSentenceRatio: complexCount / totalSentences,
            averageLength: sentences.reduce((sum, s) => sum + s.length, 0) / totalSentences
        };
    }
};
