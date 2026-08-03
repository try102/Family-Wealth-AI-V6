/*

Family Wealth AI OS

V6.3.3 Upgrade Build001

AI CFO Agent

Asset Allocation Intelligence

*/

import wealthEngine from "./wealthEngine.js";

const cfoAgent = {

    name:

    "AI CFO Agent V6.3.3 Allocation Intelligence",

    // ======================

    // 初始化

    // ======================

    init(){

        return "AI CFO V6.3.3 Ready";

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

        const allocationAnalysis =

        wealthEngine.allocationAnalysis(

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

            allocation,

            allocationAnalysis,

            advice:

            this.generateAdvice(

                wealth,

                allocationAnalysis

            )

        };

    },

    // ======================

    // 财富评分

    // ======================

    calculateScore(wealth){

        let score = 0;

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

        if(

            wealth.totalIncome > 0

        ){

            score += 20;

        }

        if(

            wealth.investmentCount > 0

        ){

            score += 15;

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

            score += 25;

        }

        else if(

            debtRatio < 50

        ){

            score += 15;

        }

        if(

            wealth.assetCount >= 3

        ){

            score += 10;

        }

        return Math.min(

            score,

            100

        );

    },

    // ======================

    // AI建议 V6.3.3

    // ======================

    generateAdvice(

        wealth,

        allocationAnalysis

    ){

        let advice = [];

        if(

            wealth.totalAssets === 0

        ){

            advice.push(

                "请完善家庭资产信息"

            );

            return advice;

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

        // ======================

        // V6.3.3 资产配置分析

        // ======================

        if(

            allocationAnalysis

            &&

            allocationAnalysis.ratio

        ){

            let ratio =

            allocationAnalysis.ratio;

            if(

                ratio["房地产"]

                >

                60

            ){

                advice.push(

                    "房地产资产占比较高，建议关注资产集中风险"

                );

            }

            if(

                ratio["现金"]

                <

                10

            ){

                advice.push(

                    "现金比例偏低，建议保持一定流动资金"

                );

            }

            if(

                ratio["投资资产"]

                >

                0

            ){

                advice.push(

                    "已建立投资资产配置，可持续优化长期收益结构"

                );

            }

        }

        if(

            advice.length === 0

        ){

            advice.push(

                "当前财富结构运行正常"

            );

        }

        return advice;

    },

    // ======================

    // 对外接口

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
