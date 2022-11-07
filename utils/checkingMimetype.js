/**
 * 检测环境支持的媒体类型
 * @parmam {Blob} media
 * @parmam {String} types
 * @parmam {String} codecs
 * @return {Array}
*/
function getSupportedMimeTypes(media, types, codecs) {
  const isSupported = MediaRecorder.isTypeSupported;
  const supported = [];
  types.forEach((type) => {
    const mimeType = `${media}/${type}`;
    codecs.forEach((codec) => [
        `${mimeType};codecs=${codec}`,
        `${mimeType};codecs=${codec.toUpperCase()}`,
      ].forEach(variation => {
        if(isSupported(variation)) 
            supported.push(variation);
    }));
    if (isSupported(mimeType))
      supported.push(mimeType);
  });
  return supported;
};

/**
 * 控制台打印支持的媒体类型列表
 * @return {Object}
*/
export default function(){
	const videoTypes = ["webm", "ogg", "mp4", "x-matroska"];
	const audioTypes = ["webm", "ogg", "mp3", "x-matroska"];
	const codecs = ["should-not-be-supported","vp9", "vp9.0", "vp8", "vp8.0", "avc1", "av1", "h265", "h.265", "h264", "h.264", "opus", "pcm", "aac", "mpeg", "mp4a"];
	const supportedVideos = getSupportedMimeTypes("video", videoTypes, codecs);
	const supportedAudios = getSupportedMimeTypes("audio", audioTypes, codecs);
	// 最佳支持 Video : supportedVideos[0]
	// 最佳支持 Audio : supportedAudios[0]
	// 所有 Videos : supportedVideos
	// 所有 Audios : supportedAudios
	
	return {video:supportedVideos[0],audio:supportedAudios[0]}
}
