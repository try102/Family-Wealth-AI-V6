/*

 

Family Wealth AI OS

V7.0 Final Build

AI Advisor

家庭财富智能顾问

*/

import wealthEngine from "../agents/wealthEngine.js";

import cfoAgent from "../agents/cfoAgent.js";

const advisor = {

    name:

    "Family Wealth AI Advisor V7.0",

    // ======================

    // 初始化

    // ======================

    init(){

        return "Advisor AI Ready";

    },

    // ======================

    // 财富诊断

    // ======================

    analyze(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    ){

        const report =

        cfoAgent.report(

            assetsAgent,

            investmentAgent,

            incomeAgent,

            liabilityAgent

        );

        const health =

        wealthEngine.financialHealth(

            assetsAgent,

            investmentAgent,

            incomeAgent,

            liabilityAgent

        );

        return{

            title:

            "家庭财富 AI 顾问报告",

            summary:

            this.summary(

                report

            ),

            strengths:

            this.strengths(

                report

            ),

            risks:

            this.risks(

                health,

                report

            ),

            actions:

            this.actions(

                health,

                report

            ),

            score:

            report.wealthScore || 0

        };

    },

    // ======================

    // 财富总结

    // ======================

    summary(

        report

    ){

        return [

            "当前家庭净资产 ¥"

            +

            Number(

                report.netWorth || 0

            )

            .toLocaleString("zh-CN"),

            "家庭总资产 ¥"

            +

            Number(

                report.totalAssets || 0

            )

            .toLocaleString("zh-CN"),

            "年度收入 ¥"

            +

            Number(

                report.totalIncome || 0

            )

            .toLocaleString("zh-CN")

        ];

    },

    // ======================

    // 优势分析

    // ======================

    strengths(

        report

    ){

        let result=[];

        if(

            report.totalAssets>0

        ){

            result.push(

            "已经建立家庭资产基础"

            );

        }

        if(

            report.totalIncome>0

        ){

            result.push(

            "具有稳定现金流来源"

            );

        }

        if(

            report.investmentProfit>0

        ){

            result.push(

            "投资组合产生正收益"

            );

        }

        return result;

    },

    // ======================

    // 风险分析

    // ======================

    risks(

        health,

        report

    ){

        let result=[];

        if(

            health.realEstateRatio>70

        ){

            result.push(

            "房地产占比过高，需要关注资产集中风险"

            );

        }

        if(

            health.liquidityRatio<10

        ){

            result.push(

            "流动资产比例偏低，需要增加现金储备"

            );

        }

        if(

            health.debtRatio>50

        ){

            result.push(

            "负债比例较高，需要关注偿债压力"

            );

        }

        if(

            result.length===0

        ){

            result.push(

            "当前财富结构风险可控"

            );

        }

        return result;

    },

    // ======================

    // 行动建议

    // ======================

    actions(

        health,

        report

    ){

        let result=[];

        if(

            health.liquidityRatio<10

        ){

            result.push(

            "建议建立6-12个月家庭备用资金"

            );

        }

        if(

            health.realEstateRatio>70

        ){

            result.push(

            "未来新增资产建议提高金融资产比例"

            );

        }

        if(

            report.investmentProfit>0

        ){

            result.push(

            "继续优化长期投资组合"

            );

        }

        result.push(

        "定期更新家庭财富数据，保持财富监控"

        );

        return result;

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

export default advisor;
