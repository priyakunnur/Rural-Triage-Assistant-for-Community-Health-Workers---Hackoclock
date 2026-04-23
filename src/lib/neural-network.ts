/**
 * A lightweight, pure-TypeScript 3-layer Feed-Forward Neural Network.
 * Avoids the need for external heavy ML libraries and works perfectly offline.
 */

export class NeuralNetwork {
  private inputNodes: number;
  private hiddenNodes: number;
  private outputNodes: number;
  private learningRate: number;

  private weightsIH: number[][]; // weights from Input to Hidden
  private weightsHO: number[][]; // weights from Hidden to Output
  private biasH: number[];       // bias for Hidden
  private biasO: number[];       // bias for Output

  constructor(inputNodes: number, hiddenNodes: number, outputNodes: number, learningRate: number = 0.1) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.learningRate = learningRate;

    this.weightsIH = this.createMatrix(this.hiddenNodes, this.inputNodes, true);
    this.weightsHO = this.createMatrix(this.outputNodes, this.hiddenNodes, true);
    this.biasH = this.createArray(this.hiddenNodes, true);
    this.biasO = this.createArray(this.outputNodes, true);
  }

  // Sigmoid activation function
  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }

  // Derivative of sigmoid for backpropagation
  private dsigmoid(y: number): number {
    return y * (1 - y);
  }

  // Helpers for matrices
  private createMatrix(rows: number, cols: number, randomize = false): number[][] {
    const mat: number[][] = [];
    for (let i = 0; i < rows; i++) {
      mat[i] = [];
      for (let j = 0; j < cols; j++) {
        mat[i][j] = randomize ? Math.random() * 2 - 1 : 0;
      }
    }
    return mat;
  }

  private createArray(size: number, randomize = false): number[] {
    const arr: number[] = [];
    for (let i = 0; i < size; i++) {
      arr[i] = randomize ? Math.random() * 2 - 1 : 0;
    }
    return arr;
  }

  public predict(inputArray: number[]): number[] {
    // 1. Calculate Hidden Layer signals
    const hidden = this.createArray(this.hiddenNodes);
    for (let i = 0; i < this.hiddenNodes; i++) {
      let sum = 0;
      for (let j = 0; j < this.inputNodes; j++) {
        sum += this.weightsIH[i][j] * inputArray[j];
      }
      sum += this.biasH[i];
      hidden[i] = this.sigmoid(sum);
    }

    // 2. Calculate Output Layer signals
    const output = this.createArray(this.outputNodes);
    for (let i = 0; i < this.outputNodes; i++) {
      let sum = 0;
      for (let j = 0; j < this.hiddenNodes; j++) {
        sum += this.weightsHO[i][j] * hidden[j];
      }
      sum += this.biasO[i];
      output[i] = this.sigmoid(sum);
    }

    return output;
  }

  public train(inputArray: number[], targetArray: number[]) {
    // Forward pass
    const hidden = this.createArray(this.hiddenNodes);
    for (let i = 0; i < this.hiddenNodes; i++) {
      let sum = 0;
      for (let j = 0; j < this.inputNodes; j++) {
        sum += this.weightsIH[i][j] * inputArray[j];
      }
      sum += this.biasH[i];
      hidden[i] = this.sigmoid(sum);
    }

    const output = this.createArray(this.outputNodes);
    for (let i = 0; i < this.outputNodes; i++) {
      let sum = 0;
      for (let j = 0; j < this.hiddenNodes; j++) {
        sum += this.weightsHO[i][j] * hidden[j];
      }
      sum += this.biasO[i];
      output[i] = this.sigmoid(sum);
    }

    // Calculate Output errors
    const outputErrors = this.createArray(this.outputNodes);
    for (let i = 0; i < this.outputNodes; i++) {
      outputErrors[i] = targetArray[i] - output[i];
    }

    // Calculate Hidden errors
    const hiddenErrors = this.createArray(this.hiddenNodes);
    for (let i = 0; i < this.hiddenNodes; i++) {
      let error = 0;
      for (let j = 0; j < this.outputNodes; j++) {
        error += this.weightsHO[j][i] * outputErrors[j];
      }
      hiddenErrors[i] = error;
    }

    // Update weights and biases for Output Layer
    for (let i = 0; i < this.outputNodes; i++) {
      const gradient = outputErrors[i] * this.dsigmoid(output[i]) * this.learningRate;
      this.biasO[i] += gradient;
      for (let j = 0; j < this.hiddenNodes; j++) {
        this.weightsHO[i][j] += gradient * hidden[j];
      }
    }

    // Update weights and biases for Hidden Layer
    for (let i = 0; i < this.hiddenNodes; i++) {
      const gradient = hiddenErrors[i] * this.dsigmoid(hidden[i]) * this.learningRate;
      this.biasH[i] += gradient;
      for (let j = 0; j < this.inputNodes; j++) {
        this.weightsIH[i][j] += gradient * inputArray[j];
      }
    }
  }

  // Export weights and biases to string
  public exportJSON(): string {
    return JSON.stringify({
      weightsIH: this.weightsIH,
      weightsHO: this.weightsHO,
      biasH: this.biasH,
      biasO: this.biasO,
    });
  }

  // Load weights and biases from string
  public importJSON(json: string) {
    const data = JSON.parse(json);
    this.weightsIH = data.weightsIH;
    this.weightsHO = data.weightsHO;
    this.biasH = data.biasH;
    this.biasO = data.biasO;
  }
}
