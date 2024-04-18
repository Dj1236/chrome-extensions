import logging
from flask import Flask, request, abort
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline

# Initialize Flask app
app = Flask(__name__)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define route for summarization API
@app.route('/summary')
def summary_api():
    # Get the URL parameter
    url = request.args.get('url', '')
    video_id = url.split('=')[1]

    try:
        # Attempt to fetch transcript
        transcript = get_transcript(video_id)
        if not transcript:
            # Return error message if transcript is empty
            return "Transcript not found or empty", 404

        # Summarize transcript
        summary = get_summary(transcript)
        return summary, 200

    except Exception as e:
        # Log any exceptions that occur
        logger.error(f"An error occurred: {str(e)}")
        return "An error occurred while processing the request", 500

# Function to fetch transcript for a YouTube video
def get_transcript(video_id):
    try:
        # Get the transcript
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        if not transcript:
            # Return None if transcript is empty
            return None
        
        # Join transcript text from all chunks
        transcript_text = ' '.join([chunk['text'] for chunk in transcript])
        return transcript_text
    except Exception as e:
        # Log any exceptions that occur
        logger.error(f"Error fetching transcript: {str(e)}")
        # Return None if transcript fetching fails
        return None

# Function to generate summary using transformers pipeline
def get_summary(transcript):
    try:
        summarizer = pipeline('summarization')
        # Generate summary
        summary_text = summarizer(transcript)[0]['summary_text']
        return summary_text
    except Exception as e:
        logger.error(f"Error generating summary: {str(e)}")
        return None

# Run the Flask app
if __name__ == '__main__':
    app.run()
