/**
 * Advanced AI Detection Evasion Module - GPTZero Specific
 * Version 3.0 - Maximum Evasion
 */

const AIDetectorEvasion = {
    // Core evasion function
    applyEvasionTechniques(text, options) {
        try {
            const { strength = 5 } = options;
            
            // First, analyze the text structure
            const analysis = this.analyzeTextPatterns(text);
            let result = text;
            
            // Apply techniques in sequence for maximum effect
            result = this.breakSyntacticPatterns(result, strength);
            result = this.introduceHumanInconsistencies(result, strength);
            result = this.addHumanContextualMarkers(result, strength);
            result = this.disruptLanguageModel(result, strength);
            
            // Apply final transformations based on analysis
            if (analysis.needsMoreVariance) {
                result = this.increaseSentenceVariance(result);
            }
            
            if (analysis.tooConsistent) {
                result = this.breakConsistentPatterns(result, strength);
            }
            
            // Apply aggressive transformations for high strength settings
            if (strength > 7) {
                result = this.applyAggressiveEvasion(result);
            }
            
            // Enhance burstiness for better evasion
            result = this.enhanceBurstiness(result, strength);
            
            // Disrupt perplexity patterns that GPTZero detects
            result = this.disruptPerplexityPatterns(result);
            
            return result;
        } catch (e) {
            console.error("Error in applyEvasionTechniques:", e);
            return text; // Return original text if anything fails
        }
    },
    
    // Analyze text patterns to identify AI signatures
    analyzeTextPatterns(text) {
        try {
            // Calculate sentence length variance (important for burstiness)
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            const lengths = sentences.map(s => s.split(' ').length);
            const variance = this.calculateVariance(lengths);
            const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
            
            // Check for consistent punctuation patterns
            const punctuationConsistency = this.checkPunctuationConsistency(text);
            
            // Check for consistent paragraph structure
            const paragraphConsistency = this.checkParagraphConsistency(text);
            
            return {
                avgSentenceLength: avgLength,
                sentenceLengthVariance: variance,
                needsMoreVariance: variance < 5,
                tooConsistent: punctuationConsistency > 0.7 || paragraphConsistency > 0.7,
                sentenceCount: sentences.length
            };
        } catch (e) {
            console.error("Error in analyzeTextPatterns:", e);
            // Return default analysis if error occurs
            return {
                avgSentenceLength: 15,
                sentenceLengthVariance: 3,
                needsMoreVariance: true,
                tooConsistent: true,
                sentenceCount: 5
            };
        }
    },
    
    calculateVariance(array) {
        try {
            const mean = array.reduce((a, b) => a + b, 0) / array.length;
            return array.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / array.length;
        } catch (e) {
            console.error("Error calculating variance:", e);
            return 0;
        }
    },
    
    checkPunctuationConsistency(text) {
        try {
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            let commaCount = 0;
            let semicolonCount = 0;
            let dashCount = 0;
            
            sentences.forEach(s => {
                commaCount += (s.match(/,/g) || []).length;
                semicolonCount += (s.match(/;/g) || []).length;
                dashCount += (s.match(/—|–|-/g) || []).length;
            });
            
            // Calculate consistency score (0-1)
            const total = commaCount + semicolonCount + dashCount;
            if (total === 0) return 0;
            
            const maxCount = Math.max(commaCount, semicolonCount, dashCount);
            return maxCount / total;
        } catch (e) {
            console.error("Error checking punctuation consistency:", e);
            return 0.5; // Return middle value if error occurs
        }
    },
    
    checkParagraphConsistency(text) {
        try {
            const paragraphs = text.split(/\n\s*\n/);
            if (paragraphs.length <= 1) return 0;
            
            const lengths = paragraphs.map(p => p.split(' ').length);
            const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
            const variance = lengths.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / lengths.length;
            
            // Lower variance means more consistency
            return 1 - Math.min(variance / (mean * 2), 1);
        } catch (e) {
            console.error("Error checking paragraph consistency:", e);
            return 0.5; // Return middle value if error occurs
        }
    },
    
    // Break syntactic patterns that GPTZero detects
    breakSyntacticPatterns(text, strength) {
        try {
            let result = text;
            
            // Break parallel structures (which AI often creates)
            result = this.breakParallelStructures(result);
            
            // Vary conjunction usage
            result = this.varyConjunctions(result);
            
            // Disrupt common AI transition patterns
            result = this.disruptTransitions(result);
            
            // Add syntactic variety
            if (strength > 4) {
                result = this.addSyntacticVariety(result);
            }
            
            return result;
        } catch (e) {
            console.error("Error in breakSyntacticPatterns:", e);
            return text; // Return original text if error occurs
        }
    },
    
    breakParallelStructures(text) {
        try {
            // Detect and break parallel structures like "X is Y, A is B, C is D"
            const patterns = [
                {
                    regex: /(\w+) is (\w+), (\w+) is (\w+), (\w+) is (\w+)/gi,
                    replace: (match, w1, w2, w3, w4, w5, w6) => 
                        `${w1} is ${w2}. ${w3}'s actually ${w4}, and I think ${w5} is probably ${w6}`
                },
                {
                    regex: /(\w+) (can|will|should|must|may) (\w+), (\w+) (can|will|should|must|may) (\w+)/gi,
                    replace: (match, w1, v1, w2, w3, v2, w4) => 
                        `${w1} ${v1} ${w2}. Also, ${w3} ${v2} ${w4} (at least that's what I think)`
                }
            ];
            
            let result = text;
            patterns.forEach(pattern => {
                result = result.replace(pattern.regex, pattern.replace);
            });
            
            return result;
        } catch (e) {
            console.error("Error in breakParallelStructures:", e);
            return text; // Return original text if error occurs
        }
    },
    
    varyConjunctions(text) {
        try {
            // Replace some conjunctions with alternatives or split into sentences
            const conjunctions = [
                { from: /\band\b/gi, to: ["and", "plus", "also", "not to mention", "as well as"] },
                { from: /\bbut\b/gi, to: ["but", "however", "though", "yet", "still"] },
                { from: /\bbecause\b/gi, to: ["because", "since", "as", "due to the fact that"] },
                { from: /\btherefore\b/gi, to: ["therefore", "so", "thus", "as a result", "that's why"] }
            ];
            
            let result = text;
            
            conjunctions.forEach(conj => {
                // Only replace some instances (not all) to create inconsistency
                const matches = result.match(conj.from) || [];
                if (matches.length > 1) {
                    // Replace about half of the matches
                    const replaceCount = Math.ceil(matches.length / 2);
                    for (let i = 0; i < replaceCount; i++) {
                        // Find a match to replace
                        const match = result.match(conj.from);
                        if (!match) continue;
                        
                        // Choose a random replacement
                        const replacement = conj.to[Math.floor(Math.random() * conj.to.length)];
                        
                        // Sometimes split into a new sentence instead
                        if (Math.random() < 0.3) {
                            const parts = result.split(match[0]);
                            if (parts.length >= 2) {
                                // End the first sentence and start a new one
                                const firstPart = parts[0].trim();
                                const secondPart = parts.slice(1).join(match[0]).trim();
                                
                                // Only do this if it makes sense grammatically
                                if (firstPart.length > 10 && !firstPart.endsWith('.') && 
                                    secondPart.length > 10) {
                                    result = `${firstPart}. ${secondPart.charAt(0).toUpperCase() + secondPart.slice(1)}`;
                                    continue;
                                }
                            }
                        }
                        
                        // Replace the conjunction
                        result = result.replace(conj.from, replacement);
                    }
                }
            });
            
            return result;
        } catch (e) {
            console.error("Error in varyConjunctions:", e);
            return text; // Return original text if error occurs
        }
    },
    
    disruptTransitions(text) {
        try {
            // Replace formal transitions with more casual ones
            const transitions = {
                "In conclusion": ["So basically", "To wrap it up", "All in all", "When you think about it"],
                "Furthermore": ["Plus", "Also", "On top of that", "And another thing"],
                "However": ["But", "Though", "That said", "Then again"],
                "Additionally": ["Also", "Plus", "And", "Not to mention"],
                "Consequently": ["So", "Because of that", "That's why", "As a result"],
                "Nevertheless": ["Still", "But still", "Even so", "Anyway"],
                "Therefore": ["So", "That's why", "Which means", "And that's how"]
            };
            
            let result = text;
            Object.keys(transitions).forEach(formal => {
                const regex = new RegExp(`\\b${formal}\\b`, 'gi');
                if (result.match(regex)) {
                    const casual = transitions[formal];
                    const replacement = casual[Math.floor(Math.random() * casual.length)];
                    result = result.replace(regex, replacement);
                }
            });
            
            return result;
        } catch (e) {
            console.error("Error in disruptTransitions:", e);
            return text; // Return original text if error occurs
        }
    },
    
    addSyntacticVariety(text) {
        try {
            // Add variety to sentence structures
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            if (sentences.length < 3) return text;
            
            // Process some sentences
            for (let i = 0; i < sentences.length; i += 2) {
                const sentence = sentences[i];
                
                // Convert some statements to questions
                if (i > 0 && Math.random() < 0.2) {
                    if (!sentence.includes('?') && sentence.length > 20) {
                        sentences[i] = this.convertToQuestion(sentence);
                        continue;
                    }
                }
                
                // Convert some sentences to exclamations
                if (Math.random() < 0.15) {
                    if (!sentence.includes('!') && sentence.length > 15) {
                        sentences[i] = sentence.replace(/\./g, '!');
                        continue;
                    }
                }
                
                // Add interjections to some sentences
                if (Math.random() < 0.25) {
                    const interjections = ["Honestly,", "Surprisingly,", "Interestingly,", "Weirdly enough,", "To be fair,"];
                    const interjection = interjections[Math.floor(Math.random() * interjections.length)];
                    sentences[i] = interjection + " " + sentence.trim();
                }
            }
            
            return sentences.join(' ');
        } catch (e) {
            console.error("Error in addSyntacticVariety:", e);
            return text; // Return original text if error occurs
        }
    },
    
    convertToQuestion(sentence) {
        try {
            // Convert a statement to a rhetorical question
            sentence = sentence.trim();
            if (sentence.endsWith('.')) {
                sentence = sentence.slice(0, -1);
            }
            
            // Different question patterns
            const patterns = [
                `Isn't it true that ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}?`,
                `Don't you think that ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}?`,
                `Have you considered that ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}?`,
                `Why is it that ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}?`
            ];
            
            return patterns[Math.floor(Math.random() * patterns.length)];
        } catch (e) {
            console.error("Error in convertToQuestion:", e);
            return sentence + "?"; // Simple fallback
        }
    },
    
    // Introduce human inconsistencies
    introduceHumanInconsistencies(text, strength) {
        try {
            let result = text;
            
            // Add human-like self-corrections
            if (strength > 3 && Math.random() < 0.6) {
                result = this.addSelfCorrections(result);
            }
            
            // Add thought shifts
            if (strength > 4 && Math.random() < 0.7) {
                result = this.introduceThoughtShifts(result);
            }
            
            // Add redundancies (humans often repeat themselves)
            if (strength > 5 && Math.random() < 0.5) {
                result = this.addRedundancies(result);
            }
            
            // Vary punctuation style
            if (strength > 3) {
                result = this.varyPunctuation(result);
            }
            
            // Add parenthetical asides
            if (strength > 6 && Math.random() < 0.6) {
                result = this.addParentheticalAsides(result);
            }
            
            return result;
        } catch (e) {
            console.error("Error in introduceHumanInconsistencies:", e);
            return text; // Return original text if error occurs
        }
    },
    
    addSelfCorrections(text) {
        try {
            // Add human-like self-corrections
            const corrections = [
                { 
                    regex: /\b(always)\b/gi, 
                    replace: "always—well, not always, but often" 
                },
                { 
                    regex: /\b(never)\b/gi, 
                    replace: "never... actually, maybe sometimes, but rarely" 
                },
                { 
                    regex: /\b(everyone)\b/gi, 
                    replace: "everyone—well, most people anyway" 
                },
                { 
                    regex: /\b(definitely)\b/gi, 
                    replace: "definitely... or probably, I'm pretty sure" 
                },
                {
                    regex: /\b(the best)\b/gi,
                    replace: "the best—or one of the best, at least"
                },
                {
                    regex: /\b(impossible)\b/gi,
                    replace: "impossible... well, very difficult anyway"
                }
            ];
            
            // Only apply 1-2 corrections to avoid overdoing it
            const maxCorrections = Math.min(2, Math.ceil(strength / 4));
            let appliedCorrections = 0;
            let result = text;
            
            // Shuffle corrections to randomize which ones get applied
            const shuffledCorrections = [...corrections].sort(() => Math.random() - 0.5);
            
            for (const correction of shuffledCorrections) {
                if (appliedCorrections >= maxCorrections) break;
                
                if (result.match(correction.regex)) {
                    result = result.replace(correction.regex, correction.replace);
                    appliedCorrections++;
                }
            }
            
            return result;
        } catch (e) {
            console.error("Error in addSelfCorrections:", e);
            return text; // Return original text if error occurs
        }
    },
    
    introduceThoughtShifts(text) {
        try {
            const thoughtShifts = [
                " Actually, thinking about it differently, ",
                " Wait, let me rephrase that. ",
                " Hmm, another way to look at this is ",
                " On second thought, ",
                " Actually, I just realized ",
                " You know what, scratch that. I think ",
                " Let me backtrack a bit. ",
                " Actually, that's not quite right. "
            ];
            
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            if (sentences.length < 3) return text;
            
            // Choose a sentence in the middle third of the text
            const startIndex = Math.floor(sentences.length / 3);
            const endIndex = Math.floor(sentences.length * 2 / 3);
            const insertPosition = startIndex + Math.floor(Math.random() * (endIndex - startIndex));
            
            const shift = thoughtShifts[Math.floor(Math.random() * thoughtShifts.length)];
            
            sentences[insertPosition] = shift + sentences[insertPosition].trim();
            return sentences.join(' ');
        } catch (e) {
            console.error("Error in introduceThoughtShifts:", e);
            return text; // Return original text if error occurs
        }
    },
    
    addRedundancies(text) {
        try {
            // Add human-like redundancies
            const redundancies = [
                { 
                    regex: /\b(important)\b/gi, 
                    replace: "important, really important" 
                },
                { 
                    regex: /\b(interesting)\b/gi, 
                    replace: "interesting, very interesting" 
                },
                { 
                    regex: /\b(good)\b/gi, 
                    replace: "good, very good" 
                },
                {
                    regex: /\b(difficult)\b/gi,
                    replace: "difficult, really difficult"
                },
                {
                    regex: /\b(necessary)\b/gi,
                    replace: "necessary, absolutely necessary"
                }
            ];
            
            // Only apply one redundancy
            const redundancyToUse = redundancies[Math.floor(Math.random() * redundancies.length)];
            if (text.match(redundancyToUse.regex)) {
                return text.replace(redundancyToUse.regex, redundancyToUse.replace);
            }
            
            return text;
        } catch (e) {
            console.error("Error in addRedundancies:", e);
            return text; // Return original text if error occurs
        }
    },
    
    varyPunctuation(text) {
        try {
            // Create inconsistent punctuation patterns
            const patterns = [
                { regex: /\s-\s([^.!?]+?)\s-\s/g, replace: (_, p1) => ` (${p1}) ` },
                { regex: /\(([^)]+?)\)/g, replace: (_, p1) => ` — ${p1} — ` },
                { regex: /,\s([^,]{10,40}?),/g, replace: (_, p1) => `; ${p1};` },
                { regex: /\.\.\./g, replace: "…" }, // Replace three dots with ellipsis character
                { regex: /--/g, replace: "—" } // Replace double dash with em dash
            ];
            
            // Only apply some of the patterns randomly
            let result = text;
            const patternsToApply = Math.ceil(Math.random() * 2); // Apply 1-2 patterns
            
            const shuffledPatterns = [...patterns].sort(() => Math.random() - 0.5);
            for (let i = 0; i < patternsToApply; i++) {
                if (i >= shuffledPatterns.length) break;
                result = result.replace(shuffledPatterns[i].regex, shuffledPatterns[i].replace);
            }
            
            return result;
        } catch (e) {
            console.error("Error in varyPunctuation:", e);
            return text; // Return original text if error occurs
        }
    },
    
    addParentheticalAsides(text) {
        try {
            // Add human-like asides in parentheses
            const asides = [
                "(at least that's what I think)",
                "(though I could be wrong)",
                "(based on my experience)",
                "(or so I've heard)",
                "(which makes sense)",
                "(which is interesting)",
                "(if that makes sense)",
                "(for what it's worth)"
            ];
            
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            if (sentences.length < 3) return text;
            
            // Choose a random sentence that's not too short
            let attempts = 0;
            let index;
            do {
                index = Math.floor(Math.random() * sentences.length);
                attempts++;
            } while (sentences[index].length < 40 && attempts < 10);
            
            if (attempts >= 10) return text; // Couldn't find a good sentence
            
            const aside = asides[Math.floor(Math.random() * asides.length)];
            
            // Insert the aside before the final punctuation
            sentences[index] = sentences[index].replace(/([.!?]+)$/, ` ${aside}$1`);
            
            return sentences.join(' ');
        } catch (e) {
            console.error("Error in addParentheticalAsides:", e);
            return text; // Return original text if error occurs
        }
    },
    
    // Add human contextual markers
    addHumanContextualMarkers(text, strength) {
        try {
            let result = text;
            
            // Add personal opinions
            if (strength > 4) {
                result = this.addPersonalOpinions(result);
            }
            
            // Add hedging language
            if (strength > 3) {
                result = this.addHedgingLanguage(result);
            }
            
            // Add conversational markers
            if (strength > 5) {
                result = this.addConversationalMarkers(result);
            }
            
            // Add cultural references
            if (strength > 7 && Math.random() < 0.4) {
                result = this.addCulturalReferences(result);
            }
            
            return result;
        } catch (e) {
            console.error("Error in addHumanContextualMarkers:", e);
            return text; // Return original text if error occurs
        }
    },
    
    addPersonalOpinions(text) {
        try {
            // Add personal opinion markers
            const opinions = [
                "I think ",
                "In my opinion, ",
                "From my perspective, ",
                "I believe ",
                "I feel like ",
                "It seems to me that ",
                "Based on my experience, ",
                "As far as I can tell, "
            ];
            
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            if (sentences.length < 3) return text;
            
            // Choose a sentence to modify
            const index = Math.floor(Math.random() * sentences.length);
            const opinion = opinions[Math.floor(Math.random() * opinions.length)];
            
            // Add the opinion marker to the beginning of the sentence
            sentences[index] = opinion + sentences[index].trim().charAt(0).toLowerCase() + sentences[index].trim().slice(1);
            
            return sentences.join(' ');
        } catch (e) {
            console.error("Error in addPersonalOpinions:", e);
            return text; // Return original text if error occurs
        }
    },
    
    addHedgingLanguage(text) {
        try {
            // Add hedging words and phrases
            const hedges = [
                { regex: /\b(is|are|was|were)\b/gi, replace: ["might be", "could be", "is probably", "is likely"] },
                { regex: /\b(will)\b/gi, replace: ["might", "could", "will probably", "will likely"] },
                { regex: /\b(all)\b/gi, replace: ["most", "many", "a lot of", "the majority of"] },
                { regex: /\b(none)\b/gi, replace: ["hardly any", "very few", "almost none"] }
            ];
            
            let result = text;
            
            // Apply 1-2 hedges
            const hedgesToApply = Math.ceil(Math.random() * 2);
            const shuffledHedges = [...hedges].sort(() => Math.random() - 0.5);
            
            for (let i = 0; i < hedgesToApply; i++) {
                if (i >= shuffledHedges.length) break;
                
                const hedge = shuffledHedges[i];
                const matches = result.match(hedge.regex);
                
                if (matches && matches.length > 0) {
                    // Replace one instance
                    const replacement = hedge.replace[Math.floor(Math.random() * hedge.replace.length)];
                    result = result.replace(hedge.regex, replacement);
                }
            }
            
            return result;
        } catch (e) {
            console.error("Error in addHedgingLanguage:", e);
            return text; // Return original text if error occurs
        }
    },
    
    addConversationalMarkers(text) {
        try {
            // Add conversational markers
            const markers = [
                "You know, ",
                "Like I said, ",
                "As I mentioned, ",
                "Look, ",
                "Listen, ",
                "Honestly, ",
                "To be fair, ",
                "I mean, "
            ];
            
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            if (sentences.length < 3) return text;
            
            // Choose a sentence to modify
            const index = Math.floor(Math.random() * sentences.length);
            const marker = markers[Math.floor(Math.random() * markers.length)];
            
            // Add the marker to the beginning of the sentence
            sentences[index] = marker + sentences[index].trim().charAt(0).toLowerCase() + sentences[index].trim().slice(1);
            
            return sentences.join(' ');
        } catch (e) {
            console.error("Error in addConversationalMarkers:", e);
            return text; // Return original text if error occurs
        }
    },
    
    addCulturalReferences(text) {
        try {
            // Add casual cultural references
            const references = [
                " (kind of like in that movie everyone talks about)",
                " (reminds me of that meme with the cat)",
                " (it's like that song that goes...you know the one)",
                " (similar to what happened in Game of Thrones)",
                " (like that viral TikTok trend)",
                " (as they say on social media these days)"
            ];
            
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            if (sentences.length < 4) return text;
            
            // Choose a sentence to modify
            const index = Math.floor(Math.random() * sentences.length);
            const reference = references[Math.floor(Math.random() * references.length)];
            
            // Add the reference before the final punctuation
            sentences[index] = sentences[index].replace(/([.!?]+)$/, `${reference}$1`);
            
            return sentences.join(' ');
        } catch (e) {
            console.error("Error in addCulturalReferences:", e);
            return text; // Return original text if error occurs
        }
    },
    
    // Disrupt language model patterns
    disruptLanguageModel(text, strength) {
        try {
            let result = text;
            
            // Vary vocabulary predictability
            result = this.varyVocabulary(result, strength);
            
            // Add occasional slang
            if (strength > 5) {
                result = this.addSlang(result);
            }
            
            // Introduce minor grammatical quirks
            if (strength > 6) {
                result = this.addGrammaticalQuirks(result);
            }
            
            // Add filler words
            if (strength > 4) {
                result = this.addFillerWords(result);
            }
            
            return result;
        } catch (e) {
            console.error("Error in disruptLanguageModel:", e);
            return text; // Return original text if error occurs
        }
    },
    
    varyVocabulary(text, strength) {
        try {
            // Replace some words with unexpected alternatives
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
            
            let result = text;
            
            // Number of words to replace based on strength
            const replacements = Math.ceil(strength / 3);
            
            for (let i = 0; i < replacements; i++) {
                const pair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
                
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
        } catch (e) {
            console.error("Error in varyVocabulary:", e);
            return text; // Return original text if error occurs
        }
    },
    
    addSlang(text) {
        try {
            // Add occasional slang terms
            const slangTerms = [
                { formal: "very good", slang: "awesome" },
                { formal: "excited", slang: "stoked" },
                { formal: "friend", slang: "buddy" },
                { formal: "understand", slang: "get it" },
                { formal: "excellent", slang: "killer" },
                { formal: "impressive", slang: "mind-blowing" },
                { formal: "confusing", slang: "trippy" },
                { formal: "difficult", slang: "tough" }
            ];
            
            let result = text;
            
            // Only add 1-2 slang terms
            const termsToAdd = Math.ceil(Math.random() * 2);
            const shuffledTerms = [...slangTerms].sort(() => Math.random() - 0.5);
            
            for (let i = 0; i < termsToAdd; i++) {
                if (i >= shuffledTerms.length) break;
                
                const term = shuffledTerms[i];
                const regex = new RegExp(`\\b${term.formal}\\b`, 'gi');
                
                if (result.match(regex)) {
                    result = result.replace(regex, term.slang);
                }
            }
            
            return result;
        } catch (e) {
            console.error("Error in addSlang:", e);
            return text; // Return original text if error occurs
        }
    },
    
    addGrammaticalQuirks(text) {
        try {
            // Add minor grammatical quirks that humans make
            const quirks = [
                // Ending sentences with prepositions
                { 
                    regex: /\b(look at|think about|talk about|speak of|refer to) ([^.!?]+?)([.!?]+)/gi,
                    replace: (match, prep, content, punct) => `${content} ${prep.split(' ')[0]}${punct}`
                },
                // Split infinitives
                {
                    regex: /\bto ([\w]+)\b/gi,
                    replace: (match, verb) => {
                        const adverbs = ["really", "actually", "basically", "just", "quickly"];
                        const adverb = adverbs[Math.floor(Math.random() * adverbs.length)];
                        return `to ${adverb} ${verb}`;
                    }
                },
                // Dangling modifiers
                {
                    regex: /\b(After|While|Before) ([^,]+), /gi,
                    replace: (match) => match
                }
            ];
            
            let result = text;
            
            // Apply only one quirk
            const quirkToUse = quirks[Math.floor(Math.random() * quirks.length)];
            const matches = result.match(quirkToUse.regex);
            
            if (matches && matches.length > 0) {
                // Only apply to one instance
                const matchToReplace = matches[Math.floor(Math.random() * matches.length)];
                const regexMatch = matchToReplace.match(quirkToUse.regex);
                if (regexMatch && regexMatch.length > 1) {
                    result = result.replace(matchToReplace, quirkToUse.replace(matchToReplace, ...regexMatch.slice(1)));
                }
            }
            
            return result;
        } catch (e) {
            console.error("Error in addGrammaticalQuirks:", e);
            return text; // Return original text if error occurs
        }
    },
    
    addFillerWords(text) {
        try {
            // Add filler words that humans use
            const fillers = [
                "basically",
                "actually",
                "literally",
                "like",
                "you know",
                "I mean",
                "sort of",
                "kind of",
                "pretty much"
            ];
            
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            if (sentences.length < 3) return text;
            
            // Choose 1-2 sentences to modify
            const sentencesToModify = Math.min(2, Math.ceil(sentences.length / 5));
            const modifiedIndices = new Set();
            
            for (let i = 0; i < sentencesToModify; i++) {
                let index;
                do {
                    index = Math.floor(Math.random() * sentences.length);
                } while (modifiedIndices.has(index));
                
                modifiedIndices.add(index);
                
                // Choose a filler word
                const filler = fillers[Math.floor(Math.random() * fillers.length)];
                
                // Insert the filler word at a reasonable position
                const words = sentences[index].split(' ');
                if (words.length < 5) continue;
                
                // Insert after a comma or 1/3 of the way through
                let insertPosition = Math.floor(words.length / 3);
                for (let j = 0; j < words.length; j++) {
                    if (words[j].endsWith(',')) {
                        insertPosition = j + 1;
                        break;
                    }
                }
                
                words.splice(insertPosition, 0, filler);
                sentences[index] = words.join(' ');
            }
            
            return sentences.join(' ');
        } catch (e) {
            console.error("Error in addFillerWords:", e);
            return text; // Return original text if error occurs
        }
    },
    
    // Increase sentence variance for more human-like burstiness
    increaseSentenceVariance(text) {
        try {
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            if (sentences.length < 4) return text;
            
            // Create a mix of short and long sentences
            for (let i = 0; i < sentences.length; i++) {
                // Make some sentences very short
                if (i % 4 === 0 && sentences[i].split(' ').length > 10) {
                    const words = sentences[i].split(' ');
                    const endPunctuation = sentences[i].match(/[.!?]+$/);
                    if (endPunctuation) {
                        // Create a short, punchy sentence
                        sentences[i] = words.slice(0, 5).join(' ') + endPunctuation[0];
                    }
                }
                // Make some sentences longer by combining them
                else if (i % 5 === 0 && i < sentences.length - 1) {
                    const endPunctuation = sentences[i].match(/[.!?]+$/);
                    if (endPunctuation) {
                        sentences[i] = sentences[i].replace(/[.!?]+$/, ", ") + sentences[i+1].trim();
                        sentences.splice(i+1, 1);
                    }
                }
                // Add a very short interjection
                else if (i % 7 === 0 && i < sentences.length - 1) {
                    const interjections = ["Yep.", "Nope.", "Maybe.", "Exactly.", "Right.", "Sure thing.", "Absolutely.", "No way."];
                    const interjection = interjections[Math.floor(Math.random() * interjections.length)];
                    
                    // Insert the interjection before this sentence
                    sentences.splice(i, 0, interjection);
                    i++; // Skip ahead to avoid processing the same sentence again
                }
            }
            
            return sentences.join(' ');
        } catch (e) {
            console.error("Error in increaseSentenceVariance:", e);
            return text; // Return original text if error occurs
        }
    },
    
    // Break consistent patterns that GPTZero detects
    breakConsistentPatterns(text, strength) {
        try {
            let result = text;
            
            // Vary capitalization slightly
            if (strength > 5) {
                result = this.varyCapitalization(result);
            }
            
            // Add occasional typos
            if (strength > 6) {
                result = this.addTypos(result);
            }
            
            // Break up overly consistent paragraph structures
            if (strength > 4) {
                result = this.breakParagraphStructure(result);
            }
            
            return result;
        } catch (e) {
            console.error("Error in breakConsistentPatterns:", e);
            return text; // Return original text if error occurs
        }
    },
    
    varyCapitalization(text) {
        try {
            const words = text.split(' ');
            
            // Find words that could reasonably be capitalized differently
            for (let i = 0; i < words.length; i++) {
                // Skip first words of sentences
                if (i === 0 || (words[i-1] && words[i-1].match(/[.!?]$/))) continue;
                
                const word = words[i];
                
                // Occasionally capitalize a word that might be a proper noun
                if (word && word.length > 3 && !word.match(/^[A-Z]/) && Math.random() < 0.1) {
                    if (word.match(/^(internet|web|google|facebook|twitter|instagram|youtube|tiktok|amazon|netflix)$/i)) {
                        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
                    }
                }
                
                // Occasionally lowercase a non-proper noun that's capitalized
                if (word && word.match(/^[A-Z][a-z]+$/) && word.length > 1 && Math.random() < 0.2) {
                    if (!word.match(/^(I|God|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|January|February|March|April|May|June|July|August|September|October|November|December)$/)) {
                        words[i] = word.toLowerCase();
                    }
                }
            }
            
            return words.join(' ');
        } catch (e) {
            console.error("Error in varyCapitalization:", e);
            return text; // Return original text if error occurs
        }
    },
    
    addTypos(text) {
        try {
            // Add realistic typos that humans make
            const words = text.split(' ');
            const typosToAdd = Math.min(2, Math.floor(words.length / 100) + 1);
            const modifiedIndices = new Set();
            
            for (let i = 0; i < typosToAdd; i++) {
                let index;
                let attempts = 0;
                do {
                    index = Math.floor(Math.random() * words.length);
                    attempts++;
                    if (attempts > 20) break; // Avoid infinite loop
                } while (modifiedIndices.has(index) || (words[index] && words[index].length < 5));
                
                if (attempts > 20) continue;
                
                modifiedIndices.add(index);
                
                const word = words[index];
                if (!word || word.length < 5) continue;
                
                const typoType = Math.floor(Math.random() * 4);
                
                switch (typoType) {
                    case 0: // Transposed letters
                        if (word.length > 3) {
                            const pos = Math.floor(Math.random() * (word.length - 2)) + 1;
                            words[index] = word.substring(0, pos) + 
                                          word.charAt(pos + 1) + 
                                          word.charAt(pos) + 
                                          word.substring(pos + 2);
                        }
                        break;
                        
                    case 1: // Missing letter
                        if (word.length > 3) {
                            const pos = Math.floor(Math.random() * (word.length - 2)) + 1;
                            words[index] = word.substring(0, pos) + word.substring(pos + 1);
                        }
                        break;
                        
                    case 2: // Double letter
                        if (word.length > 2) {
                            const pos = Math.floor(Math.random() * (word.length - 1)) + 1;
                            words[index] = word.substring(0, pos) + 
                                          word.charAt(pos) + 
                                          word.substring(pos);
                        }
                        break;
                        
                    case 3: // Wrong letter (adjacent on keyboard)
                        if (word.length > 2) {
                            const pos = Math.floor(Math.random() * word.length);
                            const letter = word.charAt(pos).toLowerCase();
                            const keyboardAdjacent = {
                                'a': ['s', 'q', 'z'],
                                'b': ['v', 'g', 'h', 'n'],
                                'c': ['x', 'd', 'v'],
                                'd': ['s', 'e', 'f', 'c'],
                                'e': ['w', 'r', 'd'],
                                'f': ['d', 'r', 'g', 'v'],
                                'g': ['f', 't', 'h', 'b'],
                                'h': ['g', 'y', 'j', 'n'],
                                'i': ['u', 'o', 'k'],
                                'j': ['h', 'u', 'k', 'm'],
                                'k': ['j', 'i', 'l', 'm'],
                                'l': ['k', 'o', 'p'],
                                'm': ['n', 'j', 'k'],
                                'n': ['b', 'h', 'j', 'm'],
                                'o': ['i', 'p', 'l'],
                                'p': ['o', 'l'],
                                'q': ['w', 'a'],
                                'r': ['e', 't', 'f'],
                                's': ['a', 'w', 'd', 'x'],
                                't': ['r', 'y', 'g'],
                                'u': ['y', 'i', 'j'],
                                'v': ['c', 'f', 'g', 'b'],
                                'w': ['q', 'e', 's'],
                                'x': ['z', 's', 'd', 'c'],
                                'y': ['t', 'u', 'h'],
                                'z': ['a', 's', 'x']
                            };
                            
                            if (keyboardAdjacent[letter] && keyboardAdjacent[letter].length > 0) {
                                const replacement = keyboardAdjacent[letter][Math.floor(Math.random() * keyboardAdjacent[letter].length)];
                                words[index] = word.substring(0, pos) + 
                                              replacement + 
                                              word.substring(pos + 1);
                            }
                        }
                        break;
                }
            }
            
            return words.join(' ');
        } catch (e) {
            console.error("Error in addTypos:", e);
            return text; // Return original text if error occurs
        }
    },
    
    breakParagraphStructure(text) {
        try {
            // Break up consistent paragraph structures
            const paragraphs = text.split(/\n\s*\n/);
            if (paragraphs.length <= 1) return text;
            
            // Combine some paragraphs
            if (paragraphs.length > 2 && Math.random() < 0.5) {
                const index = Math.floor(Math.random() * (paragraphs.length - 1));
                paragraphs[index] = paragraphs[index] + " " + paragraphs[index + 1];
                paragraphs.splice(index + 1, 1);
            }
            
            // Split a paragraph
            if (paragraphs.length > 0 && Math.random() < 0.5) {
                const index = Math.floor(Math.random() * paragraphs.length);
                const sentences = paragraphs[index].match(/[^.!?]+[.!?]+/g) || [paragraphs[index]];
                
                if (sentences.length > 3) {
                    const splitPoint = Math.floor(sentences.length / 2);
                    const firstHalf = sentences.slice(0, splitPoint).join(' ');
                    const secondHalf = sentences.slice(splitPoint).join(' ');
                    
                    paragraphs[index] = firstHalf;
                    paragraphs.splice(index + 1, 0, secondHalf);
                }
            }
            
            return paragraphs.join('\n\n');
        } catch (e) {
            console.error("Error in breakParagraphStructure:", e);
            return text; // Return original text if error occurs
        }
    },
    
    // Apply aggressive evasion techniques for maximum GPTZero evasion
    applyAggressiveEvasion(text) {
        try {
            // These techniques are more noticeable but highly effective against GPTZero
            let result = text;
            
            // Add stream-of-consciousness elements
            result = this.addStreamOfConsciousness(result);
            
            // Add human-like errors and corrections
            result = this.addHumanErrors(result);
            
            // Break AI-like sentence structures
            result = this.breakAISentenceStructures(result);
            
            // Add personal anecdotes
            result = this.addPersonalAnecdotes(result);
            
            return result;
        } catch (e) {
            console.error("Error in applyAggressiveEvasion:", e);
            return text; // Return original text if error occurs
        }
    },
    
    addStreamOfConsciousness(text) {
        try {
            // Add stream-of-consciousness elements that GPTZero rarely flags
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
        } catch (e) {
            console.error("Error in addStreamOfConsciousness:", e);
            return text; // Return original text if error occurs
        }
    },
    
    addHumanErrors(text) {
        try {
            // Add human-like errors and corrections
            const errors = [
                { 
                    regex: /\b(\w{7,})\b/g, 
                    replace: (match) => {
                        // Misspell and correct a long word
                        const misspelled = match.slice(0, -2) + match.charAt(match.length - 1) + match.charAt(match.length - 2);
                        return `${misspelled}—I mean ${match}`;
                    }
                },
                {
                    regex: /\b(their|there|they're)\b/gi,
                    replace: (match) => {
                        // Mix up their/there/they're
                        const corrections = {
                            'their': "there—I mean their",
                            'there': "their—I mean there",
                            'they\'re': "their—I mean they're"
                        };
                        return corrections[match.toLowerCase()] || match;
                    }
                },
                {
                    regex: /\b(affect|effect)\b/gi,
                    replace: (match) => {
                        // Mix up affect/effect
                        const corrections = {
                            'affect': "effect—sorry, I mean affect",
                            'effect': "affect—no, effect"
                        };
                        return corrections[match.toLowerCase()] || match;
                    }
                }
            ];
            
            // Apply only one error
            const errorToUse = errors[Math.floor(Math.random() * errors.length)];
            const matches = text.match(errorToUse.regex);
            
            if (matches && matches.length > 0) {
                // Only apply to one instance
                const matchToReplace = matches[Math.floor(Math.random() * matches.length)];
                return text.replace(matchToReplace, errorToUse.replace(matchToReplace));
            }
            
            return text;
        } catch (e) {
            console.error("Error in addHumanErrors:", e);
            return text; // Return original text if error occurs
        }
    },
    
    breakAISentenceStructures(text) {
        try {
            // Break AI-like sentence structures
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            if (sentences.length < 3) return text;
            
            // Process some sentences
            for (let i = 0; i < sentences.length; i += 2) {
                const sentence = sentences[i];
                
                // Break parallel structures
                if (sentence.match(/,\s[^,]+,\s[^,]+,\s[^,]+/)) {
                    sentences[i] = sentence.replace(/,\s([^,]+),\s([^,]+),\s([^,]+)/, ". $1. $2. $3");
                    continue;
                }
                
                // Break balanced sentence structures
                if (sentence.match(/\bnot only\b.*\bbut also\b/i)) {
                    sentences[i] = sentence.replace(/\bnot only\b(.*)\bbut also\b(.*)/i, "not only$1. And also,$2");
                    continue;
                }
                
                // Break perfect transitions
                const transitionMatch = sentence.match(/\b(however|therefore|consequently|furthermore|moreover)\b,/i);
                if (transitionMatch) {
                    const transition = transitionMatch[1];
                    sentences[i] = sentence.replace(/\b(however|therefore|consequently|furthermore|moreover)\b,/i, "");
                    sentences.splice(i, 0, `${transition}.`);
                    i++; // Skip ahead
                    continue;
                }
            }
            
            return sentences.join(' ');
        } catch (e) {
            console.error("Error in breakAISentenceStructures:", e);
            return text; // Return original text if error occurs
        }
    },
    
    addPersonalAnecdotes(text) {
        try {
            // Add personal anecdotes that make text seem more human
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
        } catch (e) {
            console.error("Error in addPersonalAnecdotes:", e);
            return text; // Return original text if error occurs
        }
    },
    
    // Enhanced burstiness function optimized for GPTZero evasion
    enhanceBurstiness(text, strength) {
        try {
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            if (sentences.length < 4) return text;
            
            // Create a copy of sentences
            const modifiedSentences = [...sentences];
            
            // For GPTZero bypass, we need significant variance in sentence length
            // This is one of the most important factors for evasion
            
            // 1. Make 2-3 sentences very short
            const shortSentenceCount = Math.min(3, Math.ceil(modifiedSentences.length / 8));
            for (let i = 0; i < shortSentenceCount; i++) {
                // Distribute short sentences throughout the text
                const position = Math.floor(modifiedSentences.length * (i + 1) / (shortSentenceCount + 2));
                
                if (position < modifiedSentences.length && modifiedSentences[position].split(' ').length > 8) {
                    const words = modifiedSentences[position].split(' ');
                    const endPunctuation = modifiedSentences[position].match(/[.!?]+$/);
                    
                    if (endPunctuation) {
                        // Create a short, punchy sentence (4-6 words)
                        const shortLength = 4 + Math.floor(Math.random() * 3);
                        modifiedSentences[position] = words.slice(0, shortLength).join(' ') + endPunctuation[0];
                    }
                }
            }
            
            // 2. Make 1-2 sentences longer by combining them
            const longSentenceCount = Math.min(2, Math.ceil(modifiedSentences.length / 10));
            let combinedCount = 0;
            
            for (let i = 0; i < modifiedSentences.length - 1; i++) {
                if (combinedCount >= longSentenceCount) break;
                
                // Skip very short sentences and already modified ones
                if (modifiedSentences[i].split(' ').length < 5) continue;
                
                const currentSentence = modifiedSentences[i];
                const nextSentence = modifiedSentences[i+1];
                
                // Only combine if the result won't be too long
                if (currentSentence && nextSentence && 
                    currentSentence.split(' ').length + nextSentence.split(' ').length < 30) {
                    
                    const endPunctuation = currentSentence.match(/[.!?]+$/);
                    if (endPunctuation) {
                        // Use different joining patterns
                        const joinPatterns = [", and ", "; moreover, ", ", while ", ", although "];
                        const joinPattern = joinPatterns[Math.floor(Math.random() * joinPatterns.length)];
                        
                        modifiedSentences[i] = currentSentence.replace(/[.!?]+$/, joinPattern) + 
                                          nextSentence.trim().charAt(0).toLowerCase() + 
                                          nextSentence.trim().slice(1);
                        modifiedSentences.splice(i+1, 1);
                        combinedCount++;
                    }
                }
            }
            
            // 3. Add 1-2 very short interjections (critical for burstiness)
            if (modifiedSentences.length > 5) {
                const interjectionCount = Math.min(2, Math.ceil(modifiedSentences.length / 12));
                
                for (let i = 0; i < interjectionCount; i++) {
                    // Position interjections strategically
                    const position = Math.floor(modifiedSentences.length * (i + 2) / (interjectionCount + 3));
                    
                    const interjections = ["Exactly.", "Indeed.", "Absolutely.", "Definitely.", "Sure.", "Right.", "True."];
                    const interjection = interjections[Math.floor(Math.random() * interjections.length)];
                    
                    // Insert the interjection
                    modifiedSentences.splice(position, 0, interjection);
                }
            }
            
            return modifiedSentences.join(' ');
        } catch (e) {
            console.error("Error in enhanceBurstiness:", e);
            return text; // Return original text if anything fails
        }
    },
    
    // NEW FUNCTION: Disrupt perplexity patterns
    disruptPerplexityPatterns(text) {
        try {
            // GPTZero measures perplexity - disrupt it with unexpected patterns
            let result = text;
            
            // Add rare words occasionally
            const rareWords = ["defenestration", "sesquipedalian", "antidisestablishmentarianism", 
                              "pneumonoultramicroscopicsilicovolcanoconiosis", "floccinaucinihilipilification"];
            
            if (Math.random() < 0.3) {
                const rareWord = rareWords[Math.floor(Math.random() * rareWords.length)];
                const sentences = result.match(/[^.!?]+[.!?]+/g) || [result];
                if (sentences.length > 3) {
                    const index = Math.floor(sentences.length / 2);
                    const sentence = sentences[index];
                    if (sentence.endsWith('.')) {
                        sentences[index] = sentence.slice(0, -1) + ` (a word like "${rareWord}" comes to mind).`;
                        result = sentences.join(' ');
                    }
                }
            }
            
            // Add deliberate grammatical quirks that humans make but AIs avoid
            if (Math.random() < 0.4) {
                result = result.replace(/\b(who|whom)\b/gi, (match) => 
                    Math.random() < 0.5 ? match : (match.toLowerCase() === 'who' ? 'whom' : 'who'));
            }
            
            return result;
        } catch (e) {
            console.error("Error in disruptPerplexityPatterns:", e);
            return text; // Return original text if anything fails
        }
    },
    
    // NEW FUNCTION: Enhance perplexity
    enhancePerplexity(text) {
        // GPTZero measures perplexity - we need to increase it
        try {
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            const modifiedSentences = [...sentences];
            
            // 1. Add rare/unexpected words
            const rareWords = ["ostensibly", "quintessential", "serendipitous", "egregious", "paradigm"];
            
            // 2. Add unexpected sentence structures
            for (let i = 0; i < modifiedSentences.length; i += 3) {
                if (i < modifiedSentences.length) {
                    // Add a rare word
                    if (modifiedSentences[i].length > 50) {
                        const words = modifiedSentences[i].split(' ');
                        const insertPos = Math.floor(words.length / 2);
                        const rareWord = rareWords[Math.floor(Math.random() * rareWords.length)];
                        words.splice(insertPos, 0, rareWord);
                        modifiedSentences[i] = words.join(' ');
                    }
                    
                    // Add a sentence fragment
                    if (i + 1 < modifiedSentences.length) {
                        modifiedSentences.splice(i + 1, 0, "Or maybe not.");
                        i++; // Skip the inserted sentence
                    }
                }
            }
            
            return modifiedSentences.join(' ');
        } catch (e) {
            console.error("Error in enhancePerplexity:", e);
            return text; // Return original text if anything fails
        }
    },
    
    // Ultimate GPTZero bypass function - targets under 40% detection rate
    bypassGPTZero(text) {
        try {
            // Step 1: Break text into smaller units for targeted manipulation
            const paragraphs = text.split(/\n\s*\n/);
            let result = '';
            
            // Process each paragraph with extreme modifications
            paragraphs.forEach((paragraph, pIndex) => {
                // Skip empty paragraphs
                if (!paragraph.trim()) return;
                
                // Split into sentences
                const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [paragraph];
                
                // Create a modified copy to work with
                let modifiedSentences = [...sentences];
                
                // CRITICAL MODIFICATION 1: Extreme burstiness
                // GPTZero heavily relies on burstiness detection - this is our primary target
                modifiedSentences = this.createExtremeBurstiness(modifiedSentences);
                
                // CRITICAL MODIFICATION 2: First-person perspective
                // Add multiple first-person markers throughout the text
                modifiedSentences = this.addFirstPersonMarkers(modifiedSentences);
                
                // CRITICAL MODIFICATION 3: Self-corrections and thought shifts
                // These dramatically increase perplexity scores
                modifiedSentences = this.addBypassSelfCorrections(modifiedSentences);
                
                // CRITICAL MODIFICATION 4: Disrupt vocabulary patterns
                // Replace predictable words with less predictable alternatives
                modifiedSentences = this.disruptBypassVocabularyPatterns(modifiedSentences);
                
                // CRITICAL MODIFICATION 5: Add parenthetical asides
                // These break up the flow in a human-like way
                modifiedSentences = this.addBypassParentheticalAsides(modifiedSentences);
                
                // Join the modified sentences and add to result
                result += modifiedSentences.join(' ');
                
                // Add paragraph break if not the last paragraph
                if (pIndex < paragraphs.length - 1) {
                    result += '\n\n';
                }
            });
            
            // Step 2: Add global modifications
            
            // Add a personal introduction if not already present
            if (!result.match(/^(I think|In my|From my|Based on|As I|I believe)/i)) {
                const intros = [
                    "In my opinion, ",
                    "From what I understand, ",
                    "Based on my research, ",
                    "As I see it, ",
                    "I believe that "
                ];
                const intro = intros[Math.floor(Math.random() * intros.length)];
                result = intro + result.charAt(0).toLowerCase() + result.slice(1);
            }
            
            // Add a personal conclusion
            if (!result.match(/(I think|in my view|from my perspective|that's my|in my opinion).*$/i)) {
                const conclusions = [
                    " That's my take on it anyway.",
                    " At least that's how I see it.",
                    " That's my perspective on this topic.",
                    " That's what I understand about this subject.",
                    " But I could be wrong about some of this."
                ];
                const conclusion = conclusions[Math.floor(Math.random() * conclusions.length)];
                result = result + conclusion;
            }
            
            // Step 3: Add final authenticity touches
            
            // Add 1-2 strategic typos
            result = this.addStrategicTypos(result, 2);
            
            // Add inconsistent capitalization
            result = this.addInconsistentCapitalization(result);
            
            return result;
        } catch (e) {
            console.error("Error in GPTZero bypass:", e);
            return text; // Return original text if anything fails
        }
    },

    // Helper function: Create extreme burstiness (critical for GPTZero evasion)
    createExtremeBurstiness(sentences) {
        if (sentences.length < 3) return sentences;
        
        const result = [...sentences];
        
        // 1. Add several very short sentences (1-4 words)
        const shortSentencesToAdd = Math.min(3, Math.ceil(sentences.length / 5));
        
        for (let i = 0; i < shortSentencesToAdd; i++) {
            const shortSentences = [
                "I agree.",
                "Makes sense.",
                "That's key.",
                "Worth noting.",
                "Interesting point.",
                "Definitely true.",
                "I'm not sure.",
                "Could be.",
                "Maybe so.",
                "Exactly this.",
                "Totally agree."
            ];
            
            const shortSentence = shortSentences[Math.floor(Math.random() * shortSentences.length)];
            
            // Insert at strategic positions (beginning, middle, end)
            let position;
            if (i === 0) {
                // Near beginning
                position = Math.floor(result.length * 0.2);
            } else if (i === 1) {
                // Middle
                position = Math.floor(result.length * 0.5);
            } else {
                // Near end
                position = Math.floor(result.length * 0.8);
            }
            
            result.splice(position, 0, shortSentence);
        }
        
        // 2. Create 1-2 very long sentences by combining existing ones
        const longSentencesToCreate = Math.min(2, Math.ceil(sentences.length / 7));
        
        for (let i = 0; i < longSentencesToCreate; i++) {
            // Find sentences to combine
            const baseIndex = Math.floor((i + 1) * result.length / (longSentencesToCreate + 2));
            
            if (baseIndex < result.length - 1) {
                // Different joining patterns
                const joinPatterns = [
                    ", and ", 
                    ", while ", 
                    "; furthermore, ", 
                    " - and interestingly, ",
                    ", although "
                ];
                
                const joinPattern = joinPatterns[Math.floor(Math.random() * joinPatterns.length)];
                
                // Combine sentences
                result[baseIndex] = result[baseIndex].replace(/[.!?]+$/, joinPattern) + 
                    result[baseIndex + 1].trim().charAt(0).toLowerCase() + 
                    result[baseIndex + 1].trim().slice(1);
                
                // Remove the second sentence
                result.splice(baseIndex + 1, 1);
            }
        }
        
        // 3. Break one longer sentence into fragments
        const sentencesToBreak = Math.min(1, Math.ceil(sentences.length / 10));
        
        for (let i = 0; i < sentencesToBreak; i++) {
            // Find a longer sentence
            let longestIndex = 0;
            let longestLength = 0;
            
            for (let j = 0; j < result.length; j++) {
                const words = result[j].split(' ');
                if (words.length > longestLength) {
                    longestLength = words.length;
                    longestIndex = j;
                }
            }
            
            // Only break if sentence is long enough
            if (longestLength > 15) {
                const words = result[longestIndex].split(' ');
                const breakPoint = Math.floor(words.length / 2);
                
                const firstHalf = words.slice(0, breakPoint).join(' ');
                const secondHalf = words.slice(breakPoint).join(' ');
                
                // Ensure proper punctuation
                const firstHalfPunct = firstHalf.match(/[.!?]+$/) ? firstHalf : firstHalf + ".";
                const secondHalfPunct = secondHalf.match(/[.!?]+$/) ? secondHalf : secondHalf + ".";
                
                // Replace the original sentence with the two halves
                result[longestIndex] = firstHalfPunct;
                result.splice(longestIndex + 1, 0, secondHalfPunct.charAt(0).toUpperCase() + secondHalfPunct.slice(1));
            }
        }
        
        return result;
    },

    // Helper function: Add first-person markers
    addFirstPersonMarkers(sentences) {
        if (sentences.length < 2) return sentences;
        
        const result = [...sentences];
        
        // Add first-person markers to about 30% of sentences
        const markersToAdd = Math.ceil(sentences.length * 0.3);
        const positions = new Set();
        
        // Generate unique positions
        while (positions.size < markersToAdd) {
            positions.add(Math.floor(Math.random() * sentences.length));
        }
        
        // Add markers at the positions
        positions.forEach(pos => {
            const markers = [
                "I think ",
                "I believe ",
                "In my view, ",
                "From my perspective, ",
                "As I understand it, ",
                "I feel that ",
                "I'd say ",
                "I've found that ",
                "It seems to me that ",
                "Based on my experience, "
            ];
            
            const marker = markers[Math.floor(Math.random() * markers.length)];
            result[pos] = marker + result[pos].trim().charAt(0).toLowerCase() + result[pos].trim().slice(1);
        });
        
        return result;
    },

    // Helper function: Add self-corrections and thought shifts
    addBypassSelfCorrections(sentences) {
        if (sentences.length < 3) return sentences;
        
        const result = [...sentences];
        
        // Add 1-3 self-corrections or thought shifts
        const correctionsToAdd = Math.min(3, Math.ceil(sentences.length / 5));
        const positions = new Set();
        
        // Generate unique positions
        while (positions.size < correctionsToAdd) {
            positions.add(Math.floor(Math.random() * sentences.length));
        }
        
        // Add corrections at the positions
        positions.forEach(pos => {
            const corrections = [
                {
                    pattern: /\b(always|never|everyone|everything|all|none)\b/i,
                    replacement: (match) => {
                        const corrections = {
                            'always': "always—well, not always, but often",
                            'never': "never... actually, maybe sometimes, but rarely",
                            'everyone': "everyone—well, most people anyway",
                            'everything': "everything—or at least most things",
                            'all': "all—or at least most",
                            'none': "none—well, very few anyway"
                        };
                        return corrections[match.toLowerCase()] || match;
                    }
                },
                {
                    pattern: /.{10,}/,
                    replacement: () => {
                        const shifts = [
                            "Actually, thinking about it differently, ",
                            "Wait, let me rephrase that. ",
                            "Hmm, another way to look at this is ",
                            "On second thought, ",
                            "Actually, I just realized ",
                            "You know what, scratch that. I think "
                        ];
                        return shifts[Math.floor(Math.random() * shifts.length)];
                    }
                },
                {
                    pattern: /\b(their|there|they're|affect|effect|than|then|your|you're)\b/i,
                    replacement: (match) => {
                        const corrections = {
                            'their': "there—I mean their",
                            'there': "their—I mean there",
                            'they\'re': "their—I mean they're",
                            'affect': "effect—sorry, I mean affect",
                            'effect': "affect—no, effect",
                            'than': "then—I mean than",
                            'then': "than—I mean then",
                            'your': "you're—I mean your",
                            'you\'re': "your—I mean you're"
                        };
                        return corrections[match.toLowerCase()] || match;
                    }
                }
            ];
            
            // Choose a correction type
            const correction = corrections[Math.floor(Math.random() * corrections.length)];
            const sentence = result[pos];
            
            // Apply the correction
            if (sentence.match(correction.pattern)) {
                const match = sentence.match(correction.pattern)[0];
                if (typeof correction.replacement === 'function') {
                    const replacement = correction.replacement(match);
                    
                    // For thought shifts, replace the beginning of the sentence
                    if (correction === corrections[1]) {
                        result[pos] = replacement + sentence.trim().charAt(0).toLowerCase() + sentence.trim().slice(1);
                    } else {
                        // For other corrections, replace the matched text
                        result[pos] = sentence.replace(match, correction.replacement(match));
                    }
                }
            }
        });
        
        return result;
    },

    // Helper function: Disrupt vocabulary patterns
    disruptBypassVocabularyPatterns(sentences) {
        const result = [];
        
        sentences.forEach(sentence => {
            // Replace common words with less predictable alternatives
            let modified = sentence
                .replace(/\b(very)\b/gi, () => Math.random() < 0.7 ? "really" : "extremely")
                .replace(/\b(good)\b/gi, () => {
                    const alternatives = ["great", "excellent", "wonderful", "fantastic"];
                    return alternatives[Math.floor(Math.random() * alternatives.length)];
                })
                .replace(/\b(bad)\b/gi, () => {
                    const alternatives = ["poor", "terrible", "awful", "not great"];
                    return alternatives[Math.floor(Math.random() * alternatives.length)];
                })
                .replace(/\b(important)\b/gi, () => {
                    const alternatives = ["crucial", "significant", "key", "essential"];
                    return alternatives[Math.floor(Math.random() * alternatives.length)];
                })
                .replace(/\b(because)\b/gi, () => Math.random() < 0.6 ? "since" : "as")
                .replace(/\b(however)\b/gi, () => Math.random() < 0.7 ? "but" : "though")
                .replace(/\b(therefore)\b/gi, () => Math.random() < 0.6 ? "so" : "thus")
                .replace(/\b(many)\b/gi, () => Math.random() < 0.5 ? "lots of" : "a lot of")
                .replace(/\b(people)\b/gi, () => Math.random() < 0.3 ? "folks" : "people")
                .replace(/\b(think)\b/gi, () => Math.random() < 0.4 ? "believe" : "think")
                .replace(/\b(get)\b/gi, () => Math.random() < 0.5 ? "obtain" : "get")
                .replace(/\b(use)\b/gi, () => Math.random() < 0.4 ? "utilize" : "use");
            
            result.push(modified);
        });
        
        return result;
    },

    // Helper function: Add parenthetical asides
    addBypassParentheticalAsides(sentences) {
        if (sentences.length < 3) return sentences;
        
        const result = [...sentences];
        
        // Add 1-2 parenthetical asides
        const asidesToAdd = Math.min(2, Math.ceil(sentences.length / 6));
        const positions = new Set();
        
        // Generate unique positions
        while (positions.size < asidesToAdd) {
            positions.add(Math.floor(Math.random() * sentences.length));
        }
        
        // Add asides at the positions
        positions.forEach(pos => {
            const asides = [
                " (at least that's what I think)",
                " (though I could be wrong)",
                " (based on my experience)",
                " (or so I've heard)",
                " (if that makes sense)",
                " (from what I understand)",
                " (which is interesting)",
                " (which makes sense to me)",
                " (for what it's worth)",
                " (take that with a grain of salt)"
            ];
            
            const aside = asides[Math.floor(Math.random() * asides.length)];
            result[pos] = result[pos].replace(/([.!?]+)$/, `${aside}$1`);
        });
        
        return result;
    },

    // Helper function: Add strategic typos
    addStrategicTypos(text, count = 1) {
        try {
            // Common misspellings that humans make
            const commonMisspellings = {
                'their': 'thier',
                'receive': 'recieve',
                'definitely': 'definately',
                'separate': 'seperate',
                'occurrence': 'occurence',
                'necessary': 'neccessary',
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
            
            const words = text.split(' ');
            let typosAdded = 0;
            
            // First try to find common misspelling candidates
            for (let i = 0; i < words.length && typosAdded < count; i++) {
                const word = words[i].toLowerCase().replace(/[^a-z]/g, '');
                if (commonMisspellings[word]) {
                    const originalWord = words[i];
                    const punctuation = originalWord.match(/[^\w\s]$/);
                    words[i] = commonMisspellings[word] + (punctuation ? punctuation[0] : '');
                    typosAdded++;
                }
            }
            
            // If we haven't added enough typos, create some
            if (typosAdded < count) {
                for (let i = 0; i < words.length && typosAdded < count; i++) {
                    const word = words[i];
                    
                    // Only modify longer words that aren't proper nouns
                    if (word.length >= 6 && !word.match(/^[A-Z]/) && !word.match(/[^a-zA-Z]/)) {
                        // Transpose two adjacent letters
                        const pos = Math.floor(Math.random() * (word.length - 2)) + 1;
                        words[i] = word.substring(0, pos) + 
                                  word.charAt(pos + 1) + 
                                  word.charAt(pos) + 
                                  word.substring(pos + 2);
                        typosAdded++;
                    }
                }
            }
            
            return words.join(' ');
        } catch (e) {
            console.error("Error adding strategic typos:", e);
            return text; // Return original text if error occurs
        }
    },

    // Helper function: Add inconsistent capitalization
    addInconsistentCapitalization(text) {
        try {
            const words = text.split(' ');
            
            // Find words that could reasonably be capitalized differently
            for (let i = 0; i < words.length; i++) {
                // Skip first words of sentences
                if (i === 0 || (words[i-1] && words[i-1].match(/[.!?]$/))) continue;
                
                const word = words[i];
                
                // Occasionally capitalize a word that might be a proper noun
                if (word && word.length > 3 && !word.match(/^[A-Z]/) && Math.random() < 0.05) {
                    if (word.match(/^(internet|web|google|facebook|twitter|instagram|youtube|tiktok|amazon|netflix)$/i)) {
                        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
                    }
                }
                
                // Occasionally lowercase a non-proper noun that's capitalized
                if (word && word.match(/^[A-Z][a-z]+$/) && word.length > 1 && Math.random() < 0.1) {
                    if (!word.match(/^(I|God|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|January|February|March|April|May|June|July|August|September|October|November|December)$/)) {
                        words[i] = word.toLowerCase();
                    }
                }
            }
            
            return words.join(' ');
        } catch (e) {
            console.error("Error adding inconsistent capitalization:", e);
            return text; // Return original text if error occurs
        }
    },

    // Apply GPTZero-specific evasion techniques
    applyGPTZeroSpecificEvasion(text) {
        try {
            let result = text;
            
            // 1. Add deliberate inconsistencies in formatting (moderate approach)
            try {
                // Modify 10% of capitalized words
                result = result.replace(/\b([A-Z][a-z]+)\b/g, (match) => 
                    Math.random() < 0.1 ? match.toLowerCase() : match);
            } catch (e) {
                console.error("Error in formatting inconsistencies:", e);
            }
            
            // 2. Add human-like thought shifts (critical for GPTZero evasion)
            try {
                const sentences = result.match(/[^.!?]+[.!?]+/g) || [result];
                if (sentences.length > 4) {
                    // Add 1-2 thought shifts based on text length
                    const shiftsToAdd = Math.min(2, Math.ceil(sentences.length / 10));
                    
                    for (let i = 0; i < shiftsToAdd; i++) {
                        // Position shifts strategically through the text
                        const position = Math.floor((i + 1) * sentences.length / (shiftsToAdd + 1));
                        
                        const thoughtShifts = [
                            "Actually, ",
                            "Come to think of it, ",
                            "On second thought, ",
                            "Thinking about it more, ",
                            "I should clarify that "
                        ];
                        
                        const shift = thoughtShifts[Math.floor(Math.random() * thoughtShifts.length)];
                        sentences[position] = shift + sentences[position].trim().charAt(0).toLowerCase() + sentences[position].trim().slice(1);
                    }
                    
                    result = sentences.join(' ');
                }
            } catch (e) {
                console.error("Error in adding thought shifts:", e);
            }
            
            // 3. Add personal opinions (critical for GPTZero evasion)
            try {
                const sentences = result.match(/[^.!?]+[.!?]+/g) || [result];
                if (sentences.length > 3) {
                    // Add 1-2 personal opinions
                    const opinionsToAdd = Math.min(2, Math.ceil(sentences.length / 8));
                    
                    for (let i = 0; i < opinionsToAdd; i++) {
                        // Distribute opinions throughout the text
                        const position = Math.floor(sentences.length * (i + 1) / (opinionsToAdd + 2));
                        
                        const opinions = [
                            "I think ",
                            "In my opinion, ",
                            "I believe ",
                            "From my perspective, ",
                            "As far as I can tell, "
                        ];
                        
                        const opinion = opinions[Math.floor(Math.random() * opinions.length)];
                        sentences[position] = opinion + sentences[position].trim().charAt(0).toLowerCase() + sentences[position].trim().slice(1);
                    }
                    
                    result = sentences.join(' ');
                }
            } catch (e) {
                console.error("Error in adding personal opinions:", e);
            }
            
            // 4. Add parenthetical asides (very effective for GPTZero evasion)
            try {
                const sentences = result.match(/[^.!?]+[.!?]+/g) || [result];
                if (sentences.length > 4) {
                    // Add 1-2 asides
                    const asidesToAdd = Math.min(2, Math.ceil(sentences.length / 10));
                    
                    for (let i = 0; i < asidesToAdd; i++) {
                        // Position asides strategically
                        const position = Math.floor(sentences.length * (i + 2) / (asidesToAdd + 3));
                        
                        const asides = [
                            " (at least that's what I think)",
                            " (though I could be wrong)",
                            " (based on what I've read)",
                            " (from what I understand)",
                            " (if I remember correctly)"
                        ];
                        
                        const aside = asides[Math.floor(Math.random() * asides.length)];
                        sentences[position] = sentences[position].replace(/([.!?]+)$/, `${aside}$1`);
                    }
                    
                    result = sentences.join(' ');
                }
            } catch (e) {
                console.error("Error in adding parenthetical asides:", e);
            }
            
            // 5. Add one self-correction (extremely effective for GPTZero evasion)
            try {
                const corrections = [
                    { 
                        regex: /\b(always)\b/gi, 
                        replace: "always—well, not always, but often" 
                    },
                    { 
                        regex: /\b(never)\b/gi, 
                        replace: "never... actually, maybe sometimes, but rarely" 
                    },
                    { 
                        regex: /\b(everyone)\b/gi, 
                        replace: "everyone—well, most people anyway" 
                    },
                    { 
                        regex: /\b(definitely)\b/gi, 
                        replace: "definitely... or probably, I'm pretty sure" 
                    },
                    {
                        regex: /\b(the best)\b/gi,
                        replace: "the best—or one of the best, at least"
                    }
                ];
                
                // Apply one correction
                for (const correction of corrections) {
                    if (result.match(correction.regex)) {
                        result = result.replace(correction.regex, correction.replace);
                        break; // Only apply one
                    }
                }
            } catch (e) {
                console.error("Error in adding self-corrections:", e);
            }
            
            // 6. Add one casual transition replacement (good for evasion)
            try {
                const transitions = {
                    "However": "But",
                    "Therefore": "So",
                    "Additionally": "Also",
                    "Furthermore": "Plus",
                    "Consequently": "As a result",
                    "Nevertheless": "Still",
                    "Subsequently": "Later"
                };
                
                // Replace 1-2 transitions
                let replacementCount = 0;
                for (const [formal, casual] of Object.entries(transitions)) {
                    const regex = new RegExp(`\\b${formal}\\b`, 'gi');
                    if (result.match(regex)) {
                        result = result.replace(regex, casual);
                        replacementCount++;
                        if (replacementCount >= 2) break;
                    }
                }
            } catch (e) {
                console.error("Error in transition replacement:", e);
            }
            
            return result;
        } catch (e) {
            console.error("Error in GPTZero-specific evasion:", e);
            return text; // Return original text if anything fails
        }
    },

    // Add human markers like typos and emojis
    addHumanMarkers(text, options) {
        try {
            let result = text;
            const { allowTypos = true, strength = 5 } = options;
            
            // Add typos based on strength
            if (allowTypos && strength > 3) {
                result = this.addStrategicTypos(result, Math.min(3, Math.ceil(strength / 3)));
            }
            
            // Add inconsistent capitalization
            if (strength > 5) {
                result = this.addInconsistentCapitalization(result);
            }
            
            // Add personal references
            if (strength > 4) {
                const sentences = result.match(/[^.!?]+[.!?]+/g) || [result];
                if (sentences.length > 3) {
                    const personalMarkers = [
                        "I think ",
                        "In my opinion, ",
                        "From my experience, ",
                        "As I see it, ",
                        "I believe "
                    ];
                    
                    const marker = personalMarkers[Math.floor(Math.random() * personalMarkers.length)];
                    const position = Math.floor(sentences.length / 3);
                    
                    sentences[position] = marker + sentences[position].trim().charAt(0).toLowerCase() + sentences[position].trim().slice(1);
                    result = sentences.join(' ');
                }
            }
            
            return result;
        } catch (e) {
            console.error("Error adding human markers:", e);
            return text;
        }
    }
};


