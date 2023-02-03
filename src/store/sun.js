import apiClient from '../services/api';
import { defineStore } from 'pinia';

export const useLookupStore = defineStore('lookup', {
  state: () => ({
    results: [],
  }),
  getters: {},
  actions: {
    async getRes(lat, lng, date) {
      if (!date) {
        let todayDate = new Date().toISOString().slice(0, 10);
        date = todayDate;
      }
      try {
        await apiClient
          .get(`json?lat=${lat}&lng=${lng}&date=${date}&formatted=0`)
          .then((res) => {
            this.results = res.data.results;
          });
      } catch {
        this.genderList = [];
      }
    },
  },
});
