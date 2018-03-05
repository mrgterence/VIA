# This package will contain the spiders of your Scrapy project
#
# Please refer to the documentation for information on how to create and manage
# your spiders.

import scrapy
from ..items import ProductItem

class QuotesSpider(scrapy.Spider):
    name = "quotes"
 
    base_url = 'http://www.lelong.com.my'
    #start_urls = ['%s' % key]
    def __init__(self, key='', *args, **kwargs):
        super(QuotesSpider, self).__init__(*args, **kwargs)
        plus = "+"
        try:
          key = key.split('')
        except ValueError:
          key = key
        else:
          key = plus.join(key)

        self.start_urls = ['https://www.lelong.com.my/catalog/all/list?TheKeyword='+key]

    def parse(self, response):
      count = len(response.css ('.list-view'))
      products = response.css ('.list-view')
      for p in products:
        item = ProductItem()
        item ['name'] = p.css('.summary a::attr(title)').extract()
        item ['product_link'] = p.css('.summary a::attr(href)').extract()
        item ['price'] = p.css('.price b::text').extract()
        item ['ship'] = p.css('.fontsize10::text').extract()
        item ['location'] = p.css('.location::text').extract()
        item ['estimateArrive'] = p.css('.location b::text').extract()
        item ['view'] = p.css('.hit::text').extract()
        item ['seller'] = p.css('.seller a::text').extract()
        item ['seller_link'] = p.css('.seller a::attr(href)').extract()[0]
        item ['review'] = p.css('.rev::text').extract()
        yield scrapy.Request(item ['seller_link'], meta = {'item': item}, callback = self.parse_seller)

    def parse_seller(self,response):
      item = response.meta['item']
      item ['seller_detail_link'] = self.base_url + str(response.css('.profile_box a::attr(href)').extract()[0])
      yield scrapy.Request(item ['seller_detail_link'], meta = {'item': item}, callback = self.parse_seller_detail)
        
    def parse_seller_detail(self,response):
      item = response.meta['item']
      item ['s_feedBackScore'] = response.xpath('//table[1]/tr[2]/td[2]/font/font/b/text()').extract()
      item ['s_PfeedBack'] = response.xpath('//table[1]/tr[3]/td[2]/font/font/b/text()').extract()
      item ['s_MPfeedBack'] = response.xpath('//table[1]/tr[5]/td[2]/span/font/b/text()').extract()
      item ['s_MNfeedBack'] = response.xpath('//table[1]/tr[6]/td[2]/span/font/b/text()').extract()
      item ['s_Status'] = response.xpath('//table[1]/tr[7]/td[2]/font/b/text()').extract()
      item ['s_IsMStore'] = response.xpath('//table[1]/tr[8]/td[2]/font/b/text()').extract()
      item ['s_myKadVerified'] = response.xpath('//table[1]/tr[9]/td[2]/font/b/text()').extract()
      item ['s_phoneVerified'] =  response.xpath('//table[1]/tr[10]/td[2]/font/b/text()').extract()
      item ['s_TOnTime_Y'] = response.xpath('//table[2]/tr[2]/td[3]/table/tr/td[3]/table/tr[4]/td[2]/font/text()').extract()
      item ['s_TOnTime_N'] = response.xpath('//table[2]/tr[2]/td[3]/table/tr/td[3]/table/tr[4]/td[3]/font/text()').extract()
      item ['s_TOnTime_S'] = response.xpath('//table[2]/tr[2]/td[3]/table/tr/td[3]/table/tr[4]/td[4]/font/text()').extract()
      item ['s_willTA_Y'] = response.xpath('//table[2]/tr[2]/td[3]/table/tr/td[3]/table/tr[6]/td[2]/font/text()').extract()
      item ['s_willTA_N'] = response.xpath('//table[2]/tr[2]/td[3]/table/tr/td[3]/table/tr[6]/td[3]/font/text()').extract()
      item ['s_willTA_S'] = response.xpath('//table[2]/tr[2]/td[3]/table/tr/td[3]/table/tr[6]/td[4]/font/text()').extract()
      item ['s_listingAcc_Y'] = response.xpath('//table[2]/tr[2]/td[3]/table/tr/td[3]/table/tr[7]/td[2]/font/text()').extract()
      item ['s_listingAcc_N'] = response.xpath('//table[2]/tr[2]/td[3]/table/tr/td[3]/table/tr[7]/td[3]/font/text()').extract()
      item ['s_listingAcc_S'] = response.xpath('//table[2]/tr[2]/td[3]/table/tr/td[3]/table/tr[7]/td[4]/font/text()').extract()
      return item 
     
