<?php
namespace OCA\Agora\Service\Ai;

class LocalAiClient {
    private $apiUrl;
    private $modelName;
    private $httpClient;

    public function __construct(string $apiUrl, string $modelName, $httpClient) {
        $this->apiUrl = $apiUrl;
        $this->modelName = $modelName;
        $this->httpClient = $httpClient;
    }

    public function complete(string $prompt, array $options = []): string {
        $payload = [
            'model' => $this->modelName,
            'prompt' => $prompt,
            'max_tokens' => $options['max_tokens'] ?? 1000,
            'temperature' => $options['temperature'] ?? 0.7,
        ];

        $response = $this->httpClient->post($this->apiUrl . '/complete', [
            'json' => $payload
        ]);

        $data = json_decode($response->getBody(), true);
        return $data['choices'][0]['text'] ?? '';
    }

    public function setModel(string $modelName): void {
        $this->modelName = $modelName;
    }

    public function setApiUrl(string $apiUrl): void {
        $this->apiUrl = $apiUrl;
    }
}
