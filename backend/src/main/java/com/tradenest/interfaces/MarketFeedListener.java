package com.tradenest.interfaces;

import com.tradenest.models.Stock;

/**
 * Observer interface for real-time market quote broadcasts.
 * Used by multithreaded ticker simulation and GUI/WebSocket listeners.
 */
public interface MarketFeedListener {
    /**
     * Callback triggered when a stock's price/volume is updated.
     * @param stock updated stock instrument
     */
    void onPriceUpdated(Stock stock);
}
