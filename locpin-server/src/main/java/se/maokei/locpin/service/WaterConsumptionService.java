package se.maokei.locpin.service;

import se.maokei.locpin.model.WaterConsumption;

import java.util.List;

public interface WaterConsumptionService {
  List<WaterConsumption> findAll();
  List<WaterConsumption> findTopTenConsumers();
}

