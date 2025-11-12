// This is a MOCK service. In a real application, you would implement the actual Gemini API calls.
// Note: The @google/genai package is not actually installed in this environment,
// so this is for demonstration purposes.

// Mocking the GoogleGenAI class and its methods
// In a real project, you would import this: import { GoogleGenAI } from "@google/genai";
class MockGoogleGenAI {
    apiKey: string | undefined;

    constructor(config: { apiKey: string | undefined }) {
        this.apiKey = config.apiKey;
    }

    get models() {
        return {
            generateContent: async (params: { model: string, contents: string }) => {
                console.log("Mocking Gemini API call with params:", params);
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                if (!this.apiKey) {
                    return { text: "API Key not configured. Please set up your API key." };
                }

                // Simulate a plausible AI response based on a prompt
                const prompt = params.contents.toLowerCase();
                let responseText = "I am SmartTradeAI. How can I assist with your trading strategy today?";

                if (prompt.includes("trading strategy") && prompt.includes("tata motors")) {
                     responseText = `**Simple Momentum Strategy for TATA MOTORS:**

This strategy aims to capitalize on the stock's current upward trend.

*   **Entry Signal:** Buy when the stock price closes above its **20-day simple moving average (SMA)** on the daily chart. This indicates positive short-term momentum.
*   **Exit Signal (Profit Taking):** Sell when the stock price closes **15%** above your entry price.
*   **Stop-Loss:** Place a hard stop-loss **5%** below your entry price to limit potential downside.

**Conditions to Avoid:**
*   Do not enter a trade if the **Relative Strength Index (RSI)** is above **70**, as the stock may be overbought and due for a pullback.
*   Avoid trading during major news events or quarterly earnings announcements due to high volatility.`;
                } else if (prompt.includes("tata motors") && prompt.includes("bullish")) {
                    responseText = `**Bullish Analysis for Tata Motors (TATAMOTORS):**

This view focuses on the significant upside potential driven by market leadership and strategic growth.

*   **Dominant EV Position:** Tata Motors has a commanding lead in India's passenger EV market. Continued government support and rising fuel prices create a strong tailwind for EV sales growth.
*   **JLR Turnaround:** The Jaguar Land Rover business is showing a strong recovery with improved margins, a healthy order book, and a clear electrification roadmap. This is a major positive catalyst.
*   **Strong Domestic Demand:** The commercial and passenger vehicle segments in India are experiencing robust demand, which is expected to continue.

**Trading View:**
*   **Key Resistance Breakout:** A sustained move above **₹1050** could signal the start of a new uptrend towards **₹1150-₹1200**.
*   **Buy on Dips:** Consider accumulating shares on any dips towards the support level of **₹980**.`;
                } else if (prompt.includes("tata motors") && prompt.includes("bearish")) {
                     responseText = `**Bearish Analysis for Tata Motors (TATAMOTORS):**

This view considers potential headwinds and risks that could impact the stock's performance.

*   **Intensifying Competition:** Competition in the EV space is heating up with both domestic (Mahindra) and international (MG, Hyundai) players launching new models. This could erode Tata's market share.
*   **Global Macro Risks:** The JLR business is sensitive to global economic slowdowns, particularly in key markets like Europe and China. Geopolitical tensions could also disrupt supply chains.
*   **Raw Material Costs:** Fluctuations in the prices of key commodities like steel, aluminum, and battery components can put pressure on margins.

**Trading View:**
*   **Potential for Correction:** If the stock fails to break the strong resistance at **₹1050**, it could see a correction back to its primary support level around **₹940**.
*   **Risk Management:** A break below **₹940** would be a significant bearish signal and could trigger a deeper sell-off.`;
                } else if (prompt.includes("tata motors")) {
                    responseText = `**Analysis for Tata Motors (TATAMOTORS):**

*   **Sector Strength:** A key player in the burgeoning Indian EV market.
*   **Recent Performance:** Sales figures show consistent growth, indicating strong consumer demand.
*   **Catalysts:** Upcoming new model launches could provide a significant boost to revenue.

**Technical Outlook:**
*   **Resistance:** Potential breakout zone identified above **₹1050**.
*   **Support & Entry:** A good entry point could be around **₹980**.
*   **Stop-Loss:** Recommend placing a stop-loss at **₹940** to manage risk.`;
                } else if (prompt.includes("reliance")) {
                    responseText = `**Analysis for Reliance Industries (RELIANCE):**

*   **Momentum:** Showing strong bullish momentum with high recent trading volumes.
*   **Sentiment:** Positive news flow surrounding their green energy and retail businesses.
*   **RSI:** The Relative Strength Index is at **65**, which is approaching overbought territory. This calls for some caution.

**Trading Strategy:**
*   **Short-term Target:** A plausible target seems to be **₹3,200**.
*   **Stop-Loss:** Consider setting a stop-loss around **₹2,950** to protect capital.`;
                } else if (prompt.includes("nifty")) {
                    responseText = `**Nifty 50 Weekly Outlook:**

The index is currently trading near a critical resistance level of **23,500**.

*   **Bullish Scenario:** A decisive breakout above this level could trigger a rally towards the next psychological level of **24,000**.
*   **Bearish Scenario:** Failure to break resistance may lead to a consolidation or a minor pullback towards **23,200**.
*   **Market Cues:** Global market trends are mixed, suggesting potential for volatility.

**Strategy Recommendation:**
*   A **long straddle** on weekly options could be a viable strategy to profit from a large move in either direction.`;
                } else if (prompt.includes("portfolio")) {
                     responseText = `**Portfolio Analysis:**

Based on your holdings, your portfolio has a heavy concentration in the **IT sector**. While this sector has strong long-term prospects, over-concentration introduces risk.

**Recommendations for Diversification:**
*   **Hedge Risk:** Consider reducing exposure to one of your smaller IT holdings and reallocating capital.
*   **Add Financials:** The **Banking sector** offers a good hedge. **HDFC Bank** is a strong candidate due to its solid fundamentals and recent price correction.
*   **Add FMCG:** For stable, defensive growth, consider adding a company from the FMCG sector like **Hindustan Unilever**.`;
                } else if (prompt.includes("banking sector")) {
                    responseText = `**Banking Sector Outlook:**

The sector outlook is currently **positive**, driven by strong credit growth and improving asset quality across the board.

**Top Stock Picks:**
*   **Large Cap:** **HDFC Bank** and **ICICI Bank** remain top-tier choices for their stability and market leadership.
*   **Aggressive Play:** For higher risk-reward, **IDFC First Bank** presents an interesting opportunity due to its high growth potential and expanding retail loan book.`;
                } else if (prompt.includes("ev sector")) {
                     responseText = `**Indian EV Sector Analysis:**

The EV sector is a high-growth area supported by government policies and increasing consumer adoption.

**Key Stocks to Watch:**
*   **OEMs:** **Tata Motors** is the current market leader. Also, keep an eye on **Mahindra & Mahindra** as they ramp up their EV offerings.
*   **Charging Infrastructure:** **Tata Power** is making significant investments in building a nationwide charging network.
*   **Battery Technology:** **Exide Industries** and **Amara Raja Batteries** are key players in the battery ecosystem, which is critical for EV growth.`;
                } else if (prompt.includes("why buy bajfinance")) {
                    responseText = `**Investment Rationale for Bajaj Finance (BAJFINANCE):**

*   **Market Leadership:** Dominant player in the consumer finance space with a massive customer base and strong brand recognition.
*   **Consistent Growth:** Has a long track record of delivering high revenue and profit growth year over year.
*   **Digital Transformation:** Aggressive investment in their digital ecosystem and app is improving customer acquisition and operational efficiency.
*   **Valuation:** While trading at a premium valuation, it is often justified by its superior growth metrics compared to peers. A good stock for long-term growth portfolios.`;
                }


                return { text: responseText };
            }
        };
    }
}


const ai = new MockGoogleGenAI({ apiKey: process.env.API_KEY || "mock_api_key_present" });

export const getAIAnalysis = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching AI analysis:", error);
        return "An error occurred while communicating with the AI. Please check the console for details.";
    }
};