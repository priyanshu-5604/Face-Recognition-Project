import React, { Component } from "react";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "YOUR_API_KEY",
});

class ImageSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imageUrl: "",
      faceDetected: false,
      results: [],
    };
  }

  handleImageChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = async () => {
    this.setState({ imageUrl: this.state.input });
    const response = await app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input);
    this.setState({ results: response.data.outputs[0].data.regions, faceDetected: true });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleImageChange}
          placeholder="Enter image URL"
        />
        <button onClick={this.handleSubmit}>Detect Face</button>
        {this.state.faceDetected && (
          <div id="results">
            {this.state.results.map((region) => (
              <div key={region.region_info.bounding_box.top_row}>
                <p>{`Left: ${region.region_info.bounding_box.left_col}`}</p>
                <p>{`Top: ${region.region_info.bounding_box.top_row}`}</p>
                <p>{`Width: ${region.region_info.bounding_box.width}`}</p>
                <p>{`Height: ${region.region_info.bounding_box.height}`}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ImageSearchForm;