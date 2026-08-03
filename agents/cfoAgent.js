/*

Family Wealth AI OS

V6.3.8

AI CFO Agent

家庭财富智能分析中心

*/

import wealthEngine from "./wealthEngine.js";

const cfoAgent = {

    name:

    "AI CFO Agent V6.3.8 Stable",

    // ======================

    // 初始化

    // ======================

    init(){

        return "AI CFO Ready";

    },

    // ======================

    // 财富分析

    // ======================

    analyze(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    ){

        const wealth =

        wealthEngine.summary(

            assetsAgent,

            investmentAgent,

            incomeAgent,

            liabilityAgent

        );

        const allocation =

        wealthEngine.assetAllocation(

            assetsAgent,

            investmentAgent

        );

        const score =

        this.calculateScore(

            wealth

        );

        return {

            title:

            "AI CFO 财富分析报告",

            totalAssets:

            wealth.totalAssets || 0,

            totalLiability:

            wealth.totalLiability || 0,

            netWorth:

            wealth.netWorth || 0,

            totalIncome:

            wealth.totalIncome || 0,

            investmentProfit:

            wealth.investmentProfit || 0,

            investmentCount:

            wealth.investmentCount || 0,

            assetCount:

            wealth.assetCount || 0,

            wealthScore:

            score,

            // V6.3.8 新增

            scoreAnalysis:

            this.scoreAnalysis(

                wealth

            ),

            allocation,

            advice:

            this.generateAdvice(

                wealth

            )

        };

    },

    // ======================

    // 财富评分

    // V6.3.7

    // ======================

    calculateScore(

        wealth

    ){

        let score = 0;

        // 资产基础

        if(

            wealth.totalAssets > 0

        ){

            score += 20;

        }

        if(

            wealth.totalAssets > 100000

        ){

            score += 10;

        }

        // 收入能力

        if(

            wealth.totalIncome > 0

        ){

            score += 20;

        }

        // 投资能力

        if(

            wealth.investmentCount > 0

        ){

            score += 15;

        }

        // 负债健康

        let debtRatio =

        wealth.totalAssets > 0

        ?

        (

            wealth.totalLiability

            /

            wealth.totalAssets

            *

            100

        )

        :

        0;

        if(

            debtRatio < 30

        ){

            score += 20;

        }

        else if(

            debtRatio < 50

        ){

            score += 10;

        }

        // 资产完整度

        if(

            wealth.assetCount >= 3

        ){

            score += 5;

        }

        return Math.min(

            score,

            100

        );

    },

    // ======================

    // 财富评分解释

    // V6.3.8

    // ======================

    scoreAnalysis(

        wealth

    ){

        let result=[];

        if(

            wealth.totalAssets > 0

        ){

            result.push(

                "✓ 家庭资产已建立"

            );

        }

        if(

            wealth.totalIncome > 0

        ){

            result.push(

                "✓ 有稳定收入来源"

            );

        }

        if(

            wealth.investmentCount > 0

        ){

            result.push(

                "✓ 已配置投资资产"

            );

        }

        let debtRatio =

        wealth.totalAssets > 0

        ?

        (

            wealth.totalLiability

            /

            wealth.totalAssets

            *

            100

        )

        :

        0;

        if(

            debtRatio < 30

        ){

            result.push(

                "✓ 负债水平健康"

            );

        }

        else if(

            debtRatio > 50

        ){

            result.push(

                "⚠ 负债比例较高"

            );

        }

        if(

            wealth.assetCount < 3

        ){

            result.push(

                "⚠ 资产信息仍可进一步完善"

            );

        }

        if(

            result.length===0

        ){

            result.push(

                "请完善家庭财富数据"

            );

        }

        return result;

    },

    // ======================

    // AI建议

    // ======================

    generateAdvice(

        wealth

    ){

        let advice=[];

        if(

            wealth.totalAssets === 0

        ){

            advice.push(

                "请完善家庭资产信息"

            );

        }

        let debtRatio =

        wealth.totalAssets > 0

        ?

        (

            wealth.totalLiability

            /

            wealth.totalAssets

            *

            100

        )

        :

        0;

        if(

            debtRatio > 50

        ){

            advice.push(

                "家庭负债率较高，需要关注偿债能力"

            );

        }

        if(

            wealth.investmentCount > 0

            &&

            wealth.investmentProfit > 0

        ){

            advice.push(

                "投资组合产生正收益，可以继续优化资产配置"

            );

        }

        if(

            wealth.totalIncome > 0

        ){

            advice.push(

                "建议保持稳定现金流，提高长期投资比例"

            );

        }

        if(

            advice.length===0

        ){

            advice.push(

                "当前财富结构运行正常"

            );

        }

        return advice;

    },

    // ======================

    // 对外报告接口

    // ======================

    report(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    ){

        return this.analyze(

            assetsAgent,

            investmentAgent,

            incomeAgent,

            liabilityAgent

        );

    }

};

export default cfoAgent;
