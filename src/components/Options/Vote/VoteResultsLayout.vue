<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

<template>
    <div class="results-layout">
        <div class="results-summary">
            <div class="summary-card">
                <div class="summary-icon">
                    <Users :size="24" />
                </div>
                <div class="summary-content">
                    <div class="summary-value">{{ totalVotes }}</div>
                    <div class="summary-label">{{ t('agora', 'Total Votes') }}</div>
                </div>
            </div>
            <div class="summary-card">
                <div class="summary-icon">
                    <Trophy :size="24" />
                </div>
                <div class="summary-content">
                    <div class="summary-value">{{ winner?.title || '-' }}</div>
                    <div class="summary-label">{{ t('agora', 'Current Leader') }}</div>
                </div>
            </div>
            <div class="summary-card">
                <div class="summary-icon">
                    <TrendingUp :size="24" />
                </div>
                <div class="summary-content">
                    <div class="summary-value">{{ winnerPercentage }}%</div>
                    <div class="summary-label">{{ t('agora', 'Leading Percentage') }}</div>
                </div>
            </div>
            <div class="summary-card">
                <div class="summary-icon">
                    <Clock :size="24" />
                </div>
                <div class="summary-content">
                    <div class="summary-value">{{ timeRemaining }}</div>
                    <div class="summary-label">{{ t('agora', 'Time Remaining') }}</div>
                </div>
            </div>
        </div>

        <div class="charts-section">
            <div class="chart-container">
                <h4>{{ t('agora', 'Vote Distribution') }}</h4>
                <canvas ref="pieChartCanvas"></canvas>
            </div>
            <div class="chart-container">
                <h4>{{ t('agora', 'Vote Ranking') }}</h4>
                <canvas ref="barChartCanvas"></canvas>
            </div>
        </div>

        <div class="ranking-table">
            <h4>{{ t('agora', 'Detailed Ranking') }}</h4>
            <table>
                <thead>
                    <tr>
                        <th>{{ t('agora', 'Rank') }}</th>
                        <th>{{ t('agora', 'Option') }}</th>
                        <th>{{ t('agora', 'Votes') }}</th>
                        <th>{{ t('agora', 'Percentage') }}</th>
                        <th>{{ t('agora', 'Status') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(option, index) in rankedOptions" :key="option.id">
                        <td class="rank-cell">
                            <span 
    v-if="index === 0" 
    class="medal" 
    aria-label="First place"
>🥇</span>
<span 
    v-else-if="index === 1" 
    class="medal" 
    aria-label="Second place"
>🥈</span>
<span 
    v-else-if="index === 2" 
    class="medal" 
    aria-label="Third place"
>🥉</span>
                            <span v-else class="rank-badge">{{ index + 1 }}</span>

                        </td>
                        <td>
                            <div class="option-name">{{ option.title }}</div>
                        </td>
                        <td class="votes-cell">{{ getOptionVoteCount(option.id) }}</td>
                        <td class="percentage-cell">
                            <div class="mini-progress">
                                <div class="mini-progress-fill" :style="{ width: getPercentage(option) + '%' }" />
                                    <span>{{ getPercentage(option) }}%</span>
                                </div>
                        </td>
                        <td>
                            <span v-if="option.metadata?.status" class="status-tag" :class="option.metadata.status">
                                {{ option.metadata.status }}
                            </span>
                            <span v-else>-</span>
                        </td>
                    </tr>
                </tbody>
            </table>
                            </div>
        </div>
</template>

<script setup lang="ts">
    import { ref, watch, nextTick, onUnmounted } from 'vue'
import { t } from '@nextcloud/l10n'
import Chart from 'chart.js/auto'
import { Users, Trophy, TrendingUp, Clock } from 'lucide-vue-next'
import type { Option } from '../../Types/index'

const props = defineProps<{
    // options: Option[]
    rankedOptions: Option[]
    totalVotes: number
    winner: Option | null
    winnerPercentage: number
    timeRemaining: string
    getOptionVoteCount: (optionId: number) => number
    getPercentage: (option: Option) => number
}>()

const pieChartCanvas = ref<HTMLCanvasElement | null>(null)
const barChartCanvas = ref<HTMLCanvasElement | null>(null)
let pieChart: Chart | null = null
let barChart: Chart | null = null

/*
const getRankClass = (index: number): string => {
    if (index === 0) return 'gold'
    if (index === 1) return 'silver'
    if (index === 2) return 'bronze'
    return ''
}
*/

const createCharts = (): void => {
    if (!pieChartCanvas.value || !barChartCanvas.value) return

    const labels = props.rankedOptions.map(o => o.title.length > 20 ? `${o.title.substring(0, 20)  }...` : o.title)
    const votes = props.rankedOptions.map(o => props.getOptionVoteCount(o.id))
    const colors = ['#42b883', '#3490dc', '#f6993f', '#e74c3c', '#9b59b6', '#1abc9c', '#e67e22', '#2c3e50', '#16a085', '#27ae60']

    if (pieChart) pieChart.destroy()
    if (barChart) barChart.destroy()

    pieChart = new Chart(pieChartCanvas.value, {
        type: 'pie',
        data: {
            labels,
            datasets: [{
                data: votes,
                backgroundColor: colors,
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { 
                    position: 'bottom', 
                    labels: { 
                        font: { size: 11 },
                        padding: 10,
                        usePointStyle: true
                    } 
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const label = context.label || ''
                            const value = context.raw as number
                            const total = votes.reduce((a, b) => a + b, 0)
                            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0
                            return `${label}: ${value} votes (${percentage}%)`
                        }
                    }
                }
            }
        }
    })

    barChart = new Chart(barChartCanvas.value, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: t('agora', 'Votes'),
                data: votes,
                backgroundColor: colors,
                borderRadius: 8,
                barPercentage: 0.7,
                categoryPercentage: 0.8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: { 
                y: { 
                    beginAtZero: true, 
                    ticks: { stepSize: 1 },
                    grid: { color: 'rgba(0, 0, 0, 0.05)' }
                },
                x: {
                    ticks: { font: { size: 11 } },
                    grid: { display: false }
                }
            },
            plugins: { 
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const value = context.raw as number
                            const total = votes.reduce((a, b) => a + b, 0)
                            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0
                            return `${value} votes (${percentage}%)`
                        }
                    }
                }
            }
        }
    })
}

watch([() => props.rankedOptions], () => {
    nextTick(() => createCharts())
}, { deep: true })

onUnmounted(() => {
    if (pieChart) pieChart.destroy()
    if (barChart) barChart.destroy()
})
</script>

<style scoped lang="scss">
.results-layout {
    .results-summary {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
        margin-bottom: 32px;

        .summary-card {
            background: linear-gradient(135deg, var(--color-main-background) 0%, var(--color-background-dark) 100%);
            border-radius: 20px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            border: 1px solid var(--color-border);
            transition: all 0.2s ease;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            .summary-icon {
                width: 52px;
                height: 52px;
                background: linear-gradient(135deg, var(--color-primary-element-light) 0%, var(--color-primary-element) 100%);
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }

            .summary-content {
                flex: 1;

                .summary-value {
                    font-size: 28px;
                    font-weight: 800;
                    margin-bottom: 6px;
                    background: linear-gradient(135deg, var(--color-main-text) 0%, var(--color-text-lighter) 100%);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .summary-label {
                    font-size: 12px;
                    color: var(--color-text-lighter);
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
            }
        }
    }

    .charts-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        margin-bottom: 32px;

        .chart-container {
            background: var(--color-main-background);
            border-radius: 20px;
            padding: 20px;
            border: 1px solid var(--color-border);
            transition: all 0.2s ease;

            &:hover {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }

            h4 {
                margin: 0 0 20px 0;
                font-size: 16px;
                font-weight: 700;
                color: var(--color-text-lighter);
            }

            canvas {
                max-height: 320px;
            }
        }
    }

    .ranking-table {
        background: var(--color-main-background);
        border-radius: 20px;
        border: 1px solid var(--color-border);
        overflow: hidden;

        h4 {
            margin: 0;
            padding: 18px 24px;
            background: linear-gradient(135deg, var(--color-background-dark) 0%, var(--color-background-hover) 100%);
            border-bottom: 1px solid var(--color-border);
            font-size: 16px;
            font-weight: 700;
        }

        table {
            width: 100%;
            border-collapse: collapse;

            th, td {
                padding: 14px 20px;
                text-align: left;
                border-bottom: 1px solid var(--color-border);
            }

            th {
                background: var(--color-background-dark);
                font-weight: 700;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                color: var(--color-text-lighter);
            }

            tr {
                transition: background 0.2s ease;

                &:hover {
                    background: var(--color-background-hover);
                }
            }

            .rank-cell {
                width: 80px;

                .rank-badge {
                    display: inline-block;
                    width: 36px;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    border-radius: 12px;
                    font-weight: 800;
                    font-size: 14px;

                    &.gold { background: linear-gradient(135deg, #f6c343 0%, #f39c12 100%); color: white; }
                    &.silver { background: linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%); color: white; }
                    &.bronze { background: linear-gradient(135deg, #cd7f32 0%, #b87333 100%); color: white; }
                }
            }

            .votes-cell {
                font-weight: 700;
                font-size: 16px;
            }

            .percentage-cell {
                width: 150px;

                .mini-progress {
                    position: relative;
                    height: 30px;
                    background: var(--color-background-dark);
                    border-radius: 15px;
                    overflow: hidden;
                    width: 130px;

                    .mini-progress-fill {
                        height: 100%;
                        background: linear-gradient(90deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
                        transition: width 0.3s ease;
                    }

                    span {
                        position: absolute;
                        left: 12px;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 12px;
                        font-weight: 700;
                        color: var(--color-main-text);
                    }
                }
            }

            .status-tag {
                font-size: 11px;
                padding: 4px 12px;
                border-radius: 20px;
                text-transform: uppercase;
                font-weight: 700;
                letter-spacing: 0.5px;
                display: inline-block;

                &.leading { background: rgba(246, 195, 67, 0.15); color: #f6c343; }
                &.selected { background: rgba(66, 184, 131, 0.15); color: #42b883; }
                &.pending { background: rgba(149, 165, 166, 0.15); color: #95a5a6; }
            }

            .option-name {
                font-weight: 500;
            }
        }
    }
}

.medal {
    display: inline-block;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 24px;          /* scale the emoji */
    border-radius: 12px;
    background: transparent;  /* or a subtle background */
}

        @media (max-width: 768px) {
            .results-layout {
                .charts-section {
                    grid-template-columns: 1fr;
                }

                .ranking-table {
                    overflow-x: auto;

                    table {
                        min-width: 600px;
                    }
                }
            }
        }
</style>
