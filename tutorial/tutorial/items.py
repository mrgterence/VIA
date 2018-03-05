# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class ProductItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()

        name = scrapy.Field()
        product_link = scrapy.Field()
        price = scrapy.Field()
        ship = scrapy.Field()
        location = scrapy.Field()
        estimateArrive = scrapy.Field()
        view = scrapy.Field()
        seller = scrapy.Field()
        seller_link = scrapy.Field()
        seller_detail_link = scrapy.Field()
        review = scrapy.Field()
        s_feedBackScore = scrapy.Field()
        s_PfeedBack = scrapy.Field()
        s_MPfeedBack = scrapy.Field()
        s_MNfeedBack = scrapy.Field()
        s_Status = scrapy.Field()
        s_IsMStore = scrapy.Field()
        s_myKadVerified = scrapy.Field()
        s_phoneVerified = scrapy.Field()
        s_TOnTime_Y = scrapy.Field()
        s_TOnTime_N = scrapy.Field()
        s_TOnTime_S = scrapy.Field()
        s_willTA_Y = scrapy.Field()
        s_willTA_N = scrapy.Field()
        s_willTA_S = scrapy.Field()
        s_listingAcc_Y = scrapy.Field()
        s_listingAcc_N = scrapy.Field()
        s_listingAcc_S = scrapy.Field()


        count = scrapy.Field()

