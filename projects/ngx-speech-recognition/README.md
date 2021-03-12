# @ngx-lcp/speech-recognition
Simple service to listen to the person using the microphone.

[![Build Status](https://travis-ci.org/lcpereira/ngx-lcp.svg?branch=main)](https://travis-ci.org/lcpereira/ngx-lcp)

# Security Notice
This lib is still in development.

# Install
```bash
npm i @ngx-lcp/speech-recognition
```

# Usage
```typescript
import { NgxSpeechRecognitionService } from '@ngx-lcp/ngx-speech-recognition';

...
constructor(private speechRecognitionService: NgxSpeechRecognitionService) {}

start(): void {
  this.speechRecognitionService.start(
    (text: string) => {
      console.log(text);
    },
    (error) => {
      console.error(error);
    }
  );
}

stop(): void {
  this.speechRecognitionService.stop();
}
```

# License

[MIT](LICENSE)
