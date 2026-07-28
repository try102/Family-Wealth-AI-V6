/*

Family Wealth AI OS

V5.5 Core

Wealth Engine

家庭财富统一总账引擎

兼容 V5.4.1

支持 Liability Agent

*/

const wealthEngine = {

    name: "Wealth Engine V5.5 Core",

    // ======================

    // 财富总览

    // ======================

    summary(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent = null

    ) {

        const assets = assetsAgent.summary();

        const investment = investmentAgent.summary();

        const income = incomeAgent.summary();

        const normalAssets =

            Number(assets.totalValue || 0);

        const investmentAssets =

            Number(investment.totalValue || 0);

        const totalAssets =

            normalAssets + investmentAssets;

        let totalLiability = 0;

        let liabilityCount = 0;

        if (

            liabilityAgent &&

            typeof liabilityAgent.summary === "function"

        ) {

            const liability =

                liabilityAgent.summary();

            totalLiability =

                Number(

                    liability.totalLiability || 0

                );

            liabilityCount =

                liability.count || 0;

        }

        const netWorth =

            totalAssets - totalLiability;

        const debtRatio =

            totalAssets > 0

                ? Number(

                    (

                        totalLiability /

                        totalAssets *

                        100

                    ).toFixed(2)

                )

                : 0;

        return {

            totalAssets,

            totalLiability,

            netWorth,

            debtRatio,

            normalAssets,

            investmentAssets,

            totalIncome:

                Number(

                    income.totalIncome || 0

                ),

            investmentProfit:

                Number(

                    investment.profit || 0

                ),

            assetCount:

                assets.count || 0,

            liabilityCount,

            investmentCount:

                investment.count || 0,

            incomeCount:

                income.count || 0

        };

    },

    // ======================

    // 资产配置

    // ======================

    assetAllocation(

        assetsAgent,

        investmentAgent

    ) {

        const result = {};

        assetsAgent.view().forEach(item => {

            const category =

                item.category || "其他";

            if (!result[category]) {

                result[category] = 0;

            }

            result[category] +=

                Number(item.value || 0);

        });

        investmentAgent.view().forEach(item => {

            const category =

                item.type || "投资";

            if (!result[category]) {

                result[category] = 0;

            }

            result[category] +=

                Number(

                    investmentAgent.marketValue(item) || 0

                );

        });

        return result;

    },

    // ======================

    // 所有人配置

    // ======================

    ownerAllocation(

        assetsAgent,

        investmentAgent

    ) {

        const result = {};

        assetsAgent.view().forEach(item => {

            const owner =

                item.owner || "未分类";

            if (!result[owner]) {

                result[owner] = 0;

            }

            result[owner] +=

                Number(item.value || 0);

        });

        investmentAgent.view().forEach(item => {

            const owner =

                item.owner || "未分类";

            if (!result[owner]) {

                result[owner] = 0;

            }

            result[owner] +=

                Number(

                    investmentAgent.marketValue(item) || 0

                );

        });

        return result;

    },

    // ======================

    // 国家地区配置

    // ======================

    countryAllocation(

        assetsAgent,

        investmentAgent

    ) {

        const result = {};

        assetsAgent.view().forEach(item => {

            const country =

                item.country || "其他";

            if (!result[country]) {

                result[country] = 0;

            }

            result[country] +=

                Number(item.value || 0);

        });

        investmentAgent.view().forEach(item => {

            const country =

                item.market || "其他";

            if (!result[country]) {

                result[country] = 0;

            }

            result[country] +=

                Number(

                    investmentAgent.marketValue(item) || 0

                );

        });

        return result;

    },

    // ======================

    // 财富健康指标

    // ======================

    healthSummary(summary) {

        return {

            debtRatio:

                summary.debtRatio,

            debtLevel:

                summary.debtRatio < 20

                    ? "优秀"

                : summary.debtRatio < 40

                    ? "良好"

                : summary.debtRatio < 60

                    ? "偏高"

                : "高风险"

        };

    },

    // ======================

    // 完整报告

    // ======================

    report(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent = null

    ) {

        const summary = this.summary(

            assetsAgent,

            investmentAgent,

            incomeAgent,

            liabilityAgent

        );

        return {

            summary,

            allocation:

                this.assetAllocation(

                    assetsAgent,

                    investmentAgent

                ),

            ownerAllocation:

                this.ownerAllocation(

                    assetsAgent,

                    investmentAgent

                ),

            countryAllocation:

                this.countryAllocation(

                    assetsAgent,

                    investmentAgent

                ),

            health:

                this.healthSummary(

                    summary

                )

        };

    }

};

export default wealthEngine;
