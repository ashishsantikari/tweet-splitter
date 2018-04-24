import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {

	TWEET_SIZE: number = 50;
	public error: String;
	public results: String[] = [];

	submitTweet(tweet_string: String): void {
		this.error = undefined;
		try {
			this.results = this.splitString(tweet_string);
		} catch (err) {
			if (err.message === 'MESSGAE_NOT_SPLITTED') {
				this.error = 'Message cannot be splitted! Sorry :(';
			}
		}
	}

	splitString(str: String): String[] {
		if (str.length <= 50)
			return [str];

		let response: String[] = [];
		let content_length: number = str.length;
		let no_of_indicators: number = Math.ceil(content_length / this.TWEET_SIZE);
		let indicator_max_size: number = (no_of_indicators.toString().length * 2 + 2);
		let total_content_length: number = content_length + (no_of_indicators * indicator_max_size);
		let total_no_of_indicators: number = Math.ceil(total_content_length / this.TWEET_SIZE);

		let split_start: number = 0;
		let split_end: number;
		let track_indicator: number = 1;
		let splits: number = 0;
		let remaining_content_length: number = total_content_length;

		do {
			let indicator_text = this.getPageIndicator(track_indicator, total_no_of_indicators);
			if (remaining_content_length < this.TWEET_SIZE) { //last leg of separation
				response.push(indicator_text + str.substring(split_start));
			} else {
				let split_point = this.TWEET_SIZE - indicator_text.length;
				let tweet_text = str.substring(split_start, split_point);
				let split_end = tweet_text.lastIndexOf(' ');
				if (split_end === -1) {
					throw new Error('MESSGAE_NOT_SPLITTED');
				}
				response.push(indicator_text + str.substring(split_start, split_end));
				split_start = split_end + 1;

				remaining_content_length = remaining_content_length - (indicator_text.length + tweet_text.length);
			}
			splits++;
			track_indicator++;
		} while (splits < total_no_of_indicators);
		return response;
	}

	private getPageIndicator(partNum: number, totalIndicator: number) {
		return `${partNum}/${totalIndicator} `;
	}

}
