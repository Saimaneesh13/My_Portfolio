import { useState } from 'react'

const LEAVES = [
  {
    name: 'Sample 01: Solanum tuberosum (Early Blight)',
    prediction: 'Alternaria solani (Early Blight)',
    confidence: 94.6,
    latency: '38ms',
    action: 'Apply copper-based fungicide; prune affected lower canopy leaves.',
  },
  {
    name: 'Sample 02: Solanum lycopersicum (Late Blight)',
    prediction: 'Phytophthora infestans (Late Blight)',
    confidence: 92.8,
    latency: '41ms',
    action: 'Isolate infected plot immediately; halt overhead irrigation.',
  },
  {
    name: 'Sample 03: Healthy Control Foliage',
    prediction: 'Healthy Leaf Tissue',
    confidence: 98.2,
    latency: '34ms',
    action: 'No pathogen detected. Maintain standard nutrient schedule.',
  },
]

export default function AgroDetectSim() {
  const [idx, setIdx] = useState(0)
  const leaf = LEAVES[idx]

  return (
    <div className="glass-panel rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="mono-label">TensorFlow / Keras CNN + FastAPI Inference Trace</span>
        <span className="font-mono text-[11px] text-gold">Validation Accuracy: 90%+</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {LEAVES.map((l, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`px-3.5 py-2 rounded-lg text-xs border transition-all ${
              idx === i ? 'border-gold bg-gold/15 text-pure' : 'border-gold/20 text-mist'
            }`}
          >
            {l.name}
          </button>
        ))}
      </div>
      <pre className="bg-space/90 border border-gold/25 rounded-lg p-4 font-mono text-xs text-gold overflow-x-auto">
{`POST /api/v1/predict-pathology HTTP/1.1
Host: agrodetect-fastapi.internal
Status: 200 OK (${leaf.latency})

{
  "model": "AgroDetect-CNN-v2.4 (Keras/TensorFlow)",
  "input_tensor_shape": [1, 224, 224, 3],
  "predicted_class": "${leaf.prediction}",
  "confidence_score": ${(leaf.confidence / 100).toFixed(4)},
  "recommended_intervention": "${leaf.action}"
}`}
      </pre>
    </div>
  )
}
