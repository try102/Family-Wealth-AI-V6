/*

Family Wealth AI OS

V6.1 Stable Compatible Build

AI CFO Agent

家庭财富智能分析中心

*/

import wealthEngine

from "./wealthEngine.js";

const cfoAgent = {

    name:

    "AI CFO Agent V6.1 Stable",

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

        incomeAgent,

        investmentAgent,

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

            debtRatio:

            wealth.debtRatio || 0,

            wealthScore:

            score,

            allocation,

            health:{

                status:

                "正常",

                message:

                "财富结构分析完成"

            },

            advice:

            this.generateAdvice(

                wealth

            )

        };

    },

    // ======================

    // 财富评分

    // ======================

    calculateScore(wealth){

        let score = 0;

        if(

            Number(

                wealth.totalAssets || 0

            ) > 0

        ){

            score += 20;

        }

        if(

            Number(

                wealth.totalAssets || 0

            ) > 100000

        ){

            score += 10;

        }

        if(

            Number(

                wealth.totalIncome || 0

            ) > 0

        ){

            score += 20;

        }

        if(

            Number(

                wealth.investmentCount || 0

            ) > 0

        ){

            score += 15;

        }

        if(

            Number(

                wealth.totalLiability || 0

            ) === 0

        ){

            score += 25;

        }

        if(

            Number(

                wealth.assetCount || 0

            ) >= 3

        ){

            score += 10;

        }

        return Math.min(

            score,

            100

        );

    },

    // ======================

    // AI建议

    // ======================

    generateAdvice(wealth){

        let advice=[];

        if(

            Number(

                wealth.totalAssets || 0

            ) === 0

        ){

            advice.push(

                "请完善家庭资产信息"

            );

        }

        if(

            Number(

                wealth.totalIncome || 0

            ) > 0

        ){

            advice.push(

                "建议保持稳定现金流，提高长期投资比例"

            );

        }

        if(

            Number(

                wealth.investmentProfit || 0

            ) < 0

        ){

            advice.push(

                "当前投资存在亏损，需要关注风险控制"

            );

        }

        if(

            advice.length===0

        ){

            advice.push(

                "当前财富结构运行正常，可以进一步优化资产配置"

            );

        }

        return advice;

    },

    // ======================

    // 对外接口

    // ======================

    report(

        assetsAgent,

        incomeAgent,

        investmentAgent,

        liabilityAgent

    ){

        return this.analyze(

            assetsAgent,

            incomeAgent,

            investmentAgent,

            liabilityAgent

        );

    }

};

export default cfoAgent;
