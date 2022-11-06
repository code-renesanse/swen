import { Dictionary } from '../../types';

// DEPRICATED: image loading is done in the application class
/**
 * Returns an object holding imported imaga data
 * Format: directory/image
 * @param {String} rootPath - path to the 'assets' directory
 * @param {array} context
 * @returns JSON object
 */
export function buildImageDictionary (context: any): Dictionary<string> {
  const imgDictionary: Dictionary<string> = {};

  context.keys().forEach((imagePath: string) => {
    const image = imagePath.split('/');
    const key = image[1].split('.')[0];
    imgDictionary[key] = context(imagePath);
  });

  return imgDictionary;
};
