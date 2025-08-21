import { Component, computed, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss'
})
export class Pagination {
  public totalItems = signal(0)
  @Input() set setTotalItems(total: number) {
    this.totalItems.set(total)
  }

  public currentPage = signal(1)
  @Input() set setCurrentPage(val: number) {
    this.currentPage.set(val)
  }
  
  public itemsPerPage = signal(20)
  @Input() set setItemsPerPage(val: number) {
    this.itemsPerPage.set(val)
  }

  public totalPages = computed(() => {
    const items = this.itemsPerPage() 
    console.log(items, this.itemsPerPage(), this.totalItems() );
    
    return items? Math.ceil(this.totalItems() / items) : 1
  })

  public pages: Array<number> = []
}
