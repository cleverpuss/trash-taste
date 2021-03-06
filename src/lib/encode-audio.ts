import { FFMPEG_PATH } from '@src/constants'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'

ffmpeg.setFfmpegPath(FFMPEG_PATH)

/**
 * ffmpeg -i input.wav -vn -ar 44100 -ac 2 -b:a 192k output.mp3
 */

export const encodeAudio = async (
  audioFilePath: string,
  bitrate: number
): Promise<string> => {
  const { name, dir } = path.parse(audioFilePath)
  return new Promise((resolve, reject) => {
    const saveToFile = path.join(dir, `${name}.mp3`)
    ffmpeg(audioFilePath)
      .outputOption('-c:v copy')
      .outputOption('-c:a libmp3lame')
      .outputOption('-q:a 4')
      .once('end', () => {
        resolve(saveToFile)
      })
      .once('error', reject)
      .saveToFile(saveToFile)
  })
}
