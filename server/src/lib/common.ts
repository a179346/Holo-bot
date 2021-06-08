function delay (delayMs: number): Promise<null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, delayMs);
  });
}

async function retry<T> (asyncFunc: ()=>Promise<T>, retryCount = 3, retryDelayMs = 3000): Promise<T> | never {
  try {
    const result = await asyncFunc();
    return result;
  } catch (error) {
    if (retryCount > 0) {
      await delay(retryDelayMs);
      return retry(asyncFunc, retryCount - 1);
    }
    throw error;
  }
}

export const Lib = {
  delay,
  retry,
};