package com.tradenest.models;

/**
 * Stock Entity Model representing Equities and Market Instruments.
 * Inherits from AbstractEntity.
 */
public class Stock extends AbstractEntity {
    private String symbol;
    private String name;
    private String sector;
    private double price;
    private double changeVal;
    private double changePercent;
    private double dayHigh;
    private double dayLow;
    private double openPrice;
    private double prevClose;
    private String volume;
    private String marketCap;
    private double peRatio;

    public Stock() {
        super();
    }

    public Stock(String symbol, String name, String sector, double price, double changeVal,
                 double changePercent, double dayHigh, double dayLow, double openPrice,
                 double prevClose, String volume, String marketCap, double peRatio) {
        super(symbol, null);
        this.symbol = symbol;
        this.name = name;
        this.sector = sector;
        this.price = price;
        this.changeVal = changeVal;
        this.changePercent = changePercent;
        this.dayHigh = dayHigh;
        this.dayLow = dayLow;
        this.openPrice = openPrice;
        this.prevClose = prevClose;
        this.volume = volume;
        this.marketCap = marketCap;
        this.peRatio = peRatio;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
        this.id = symbol;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public double getPrice() {
        return price;
    }

    public synchronized void setPrice(double price) {
        this.price = price;
    }

    public double getChangeVal() {
        return changeVal;
    }

    public synchronized void setChangeVal(double changeVal) {
        this.changeVal = changeVal;
    }

    public double getChangePercent() {
        return changePercent;
    }

    public synchronized void setChangePercent(double changePercent) {
        this.changePercent = changePercent;
    }

    public double getDayHigh() {
        return dayHigh;
    }

    public synchronized void setDayHigh(double dayHigh) {
        this.dayHigh = dayHigh;
    }

    public double getDayLow() {
        return dayLow;
    }

    public synchronized void setDayLow(double dayLow) {
        this.dayLow = dayLow;
    }

    public double getOpenPrice() {
        return openPrice;
    }

    public void setOpenPrice(double openPrice) {
        this.openPrice = openPrice;
    }

    public double getPrevClose() {
        return prevClose;
    }

    public void setPrevClose(double prevClose) {
        this.prevClose = prevClose;
    }

    public String getVolume() {
        return volume;
    }

    public synchronized void setVolume(String volume) {
        this.volume = volume;
    }

    public String getMarketCap() {
        return marketCap;
    }

    public void setMarketCap(String marketCap) {
        this.marketCap = marketCap;
    }

    public double getPeRatio() {
        return peRatio;
    }

    public void setPeRatio(double peRatio) {
        this.peRatio = peRatio;
    }

    @Override
    public String toJson() {
        return String.format(
            "{\"symbol\":\"%s\",\"name\":\"%s\",\"sector\":\"%s\",\"price\":%.2f,\"change\":%.2f,\"changePercent\":%.2f,\"dayHigh\":%.2f,\"dayLow\":%.2f,\"open\":%.2f,\"prevClose\":%.2f,\"volume\":\"%s\",\"marketCap\":\"%s\",\"peRatio\":%.2f}",
            escape(symbol), escape(name), escape(sector), price, changeVal, changePercent, dayHigh, dayLow, openPrice, prevClose, escape(volume), escape(marketCap), peRatio
        );
    }
}
