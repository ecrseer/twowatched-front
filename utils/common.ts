export function utilsDelay<T>(ms: number, value: T) {
    return new Promise<T>((resolve) => setTimeout(resolve, ms, value));
}

export function utilsRandomId() {
    return Math.random().toString(36).substring(2);
}

export function utilsAwaitUntil(condition: () => boolean, options: { maxTries: number }) {
    return new Promise<boolean>((resolve, reject) => {
        const checkCondition = () => {
            if (condition()) {
                resolve(true);
            } else if (options.maxTries <= 0) {
                reject(false);
            } else {
                options.maxTries--;
                setTimeout(checkCondition, 3000);
            }
        };
        checkCondition();
    });
}
