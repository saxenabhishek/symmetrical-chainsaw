import scrapy


class QuotesSpider(scrapy.Spider):
    name = 'tshirts'
    start_urls = [
        '',
    ]
    user_agent = 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'

    custom_settings = {
        'DEPTH_LIMIT': 3
    }

    def parse(self, response):
        prods = response.css(" div.s-main-slot.s-result-list.s-search-results.sg-row")
        items = prods.css("div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16")
        for item in items:
            yield{
                "img_src": item.css("img::attr(src)").get(),
                "alter_src": item.css("img::attr(srcset)").get(),
                "colors": item.css("span a::attr(aria-label)").getall(),
                "tag": item.css("span.a-badge-text::text").get(),
                "name": item.css("span.a-size-base-plus.a-color-base::text").getall(),
                "stars": item.css("span.a-icon-alt::text").get(),
                "revs": item.css("span.a-size-base::text").get(),
                "price": item.css("span.a-price-whole::text").get(),
                "og_price": item.css("span.a-price.a-text-price span::text").get()
            }
        next_page = response.css("li.a-last a::attr(href)").get()
        if next_page is not None:
            yield response.follow(next_page, self.parse)
