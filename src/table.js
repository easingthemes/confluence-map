import { renderStyle } from './style.js';
import { config } from './config.js';
import { NS } from './ns.js';

export class ConfigTable {
  constructor({
    decimals = 2
  } = {}) {
    this.options = {
      decimals
    }
  }

  init() {
    this.elements = this.getElements();
    this.tableData = this.getTableData();
    this.setInitialData();
    this.addEvents();

    NS.config = this.config;

    renderStyle(document.head, `
    <style>
    .confluenceTable tr:hover {
        background-color: #ccc;
    }
    .confluenceTable td:nth-child(2) {
        cursor: pointer;
    }
    `);
  }

  getElements() {
    return {
      $tableRows: document.querySelectorAll(config.LOCATIONS_ROWS),
      $configRows: document.querySelectorAll(config.CONFIG_ROWS)
    }
  }

  get config() {
    const $configRow = this.elements.$configRows[1];
    const $configColumns = $configRow.children;
    const defaultZoom = Number($configColumns?.[0]?.innerText);
    const initialCenter = $configColumns[1].innerText.split(',')
      .map(i => Number.parseFloat(i.trim()).toFixed(this.options.decimals));

    $configRow.addEventListener('click', () => {
      NS.map.setView(initialCenter, defaultZoom);
    });

    return {
      defaultZoom,
      initialCenter,
      locationZoom: Number($configColumns?.[2]?.innerText)
    }
  }

  getTableRows() {
    const tableRows = [...this.elements.$tableRows];
    tableRows.shift();

    return tableRows;
  }

  getTableData() {
    const tableRows = this.getTableRows();
    return tableRows.map($row => {
      const $columns = $row.children || [];
      const $colPoint = $columns[0];
      const $colLabel = $columns[1];
      const $colLocation = $columns[2];

      if (!$colPoint || !$colLabel || !$colLocation) {
        throw new Error('missing config table');
      }

      // trim label whitespace
      const label = $colLabel.innerText.trim();

      // trim location to 2 decimals
      const location = $colLocation.innerText.split(',')
        .map(i => Number.parseFloat(i.trim()).toFixed(this.options.decimals));
      $colLocation.innerText = location.join(',');

      // get location point element
      const $point = $colPoint.querySelector('.inline-task-list li');

      return {
        $colLabel,
        $point,
        label,
        location
      }
    });
  }

  setInitialData() {
    this.tableData.map(({ $point, label, location }) => {
      const { id, active } = this.getPointData($point);
      NS.state = ({
        id,
        label,
        location,
        active
      });
    });
  }

  getPointData($point) {
    return {
      id: $point.dataset.inlineTaskId,
      active: $point.classList.contains('checked')
    }
  }

  handleMutations(mutationList) {
    mutationList.forEach(({ target, type, attributeName }) => {
      if (type === 'attributes' && attributeName === 'class') {
        const { id, active } = this.getPointData(target);
        NS.state = ({
          id,
          active
        });
      }
    });
  }

  addEvents() {
    this.handleMutations  = this.handleMutations.bind(this);
    const observer = new MutationObserver(this.handleMutations);
    this.tableData.map(({ $colLabel, $point, label, location }) => {
      observer.observe($point, {
        attributes: true
      });

      $colLabel.addEventListener('click', () => {
        NS.map.setView(location, this.config.locationZoom);
      });
    });
  }
}
