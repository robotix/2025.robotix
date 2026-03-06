import { useEffect, useState } from "react";

/**
 * Custom hook for creating a scramble text animation effect
 * @param {string|string[]} text - The final text(s) to display
 * @param {Object} options - Configuration options
 * @param {number} options.speed - Speed of the animation in milliseconds (default: 50)
 * @param {number} options.step - Iteration step size (default: 1/3)
 * @param {string} options.chars - Characters to use for scrambling
 * @returns {string|string[]} - The current display text(s)
 */
export default function useScrambleText(
    text,
    options = {}
) {
    const {
        speed = 50,
        step = 1 / 3,
        chars = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    } = options;

    const isMultiple = Array.isArray(text);
    const texts = isMultiple ? text : [text];
    
    const [displayTexts, setDisplayTexts] = useState(
        texts.map(() => "")
    );

    useEffect(() => {
        const iterations = texts.map(() => 0);

        const scrambleInterval = setInterval(() => {
            const newDisplayTexts = texts.map((finalText, textIndex) => {
                const iteration = iterations[textIndex];
                
                return finalText
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return finalText[index];
                        }
                        if (char === " ") {
                            return " ";
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("");
            });

            setDisplayTexts(newDisplayTexts);

            // Check if all texts are complete
            const allComplete = iterations.every(
                (iter, idx) => iter >= texts[idx].length
            );

            if (allComplete) {
                clearInterval(scrambleInterval);
            }

            // Increment all iterations
            iterations.forEach((_, idx) => {
                iterations[idx] += step;
            });
        }, speed);

        return () => clearInterval(scrambleInterval);
    }, [text, speed, step, chars]);

    return isMultiple ? displayTexts : displayTexts[0];
}
