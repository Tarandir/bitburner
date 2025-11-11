/** @param {NS} ns **/
export async function main(ns) {
    ns.disableLog("ALL");
    const symbols = ns.stock.getSymbols();
    ns.tprint(`🚨 Emergency Sell Triggered! Selling everything (${symbols.length} symbols)...`);

    for (const sym of symbols) {
        const [shares, avgPrice, shortShares, shortAvg] = ns.stock.getPosition(sym);

        // Sell long positions
        if (shares > 0) {
            const sellPrice = ns.stock.sellStock(sym, shares);
            const profit = (sellPrice - avgPrice) * shares;
            ns.tprint(`💸 Sold ${shares} ${sym} @ ${ns.formatNumber(sellPrice)} for +${ns.formatNumber(profit)}`);
        }

        // Cover shorts if any
        if (shortShares > 0) {
            const coverPrice = ns.stock.sellShort(sym, shortShares);
            const profit = (shortAvg - coverPrice) * shortShares;
            ns.tprint(`📉 Covered ${shortShares} short ${sym} @ ${ns.formatNumber(coverPrice)} for +${ns.formatNumber(profit)}`);
        }
    }

    ns.tprint("✅ All positions cleared!");
}
